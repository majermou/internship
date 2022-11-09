import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import ABI from "./oracleAbi/Oracle.json";

var blockNum;

export default function App() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_nodeProvider);
    const wallet = new ethers.Wallet(process.env.REACT_APP_PKey, provider);
    const oracleContract = new ethers.Contract(process.env.REACT_APP_OracleScAddr, ABI, wallet);
    const pattern1 = /^[A-Z]{2}[0-9]{6}$/;
    const pattern2 = /^[A-Z]{1}[0-9]{6}$/;

    const [cine, setCINE] = useState("");
    const [inspecting, setInspecting] = useState(false);
    const [assure, setAssure] = useState([]);
    const [isEligible, setIsEligible] = useState(false);
    const [regime, setRegime] = useState("");
    const [dernierRegime, setDernierRegime] = useState("");
    const [render, setRender] = useState(false);

    const inspect = async () => {

        if (!pattern1.test(cine) && !pattern2.test(cine)) {
            alert("Entrez une CINE valide");
            setCINE("");
            return;
        }

        try {
            let flag = false;
            setInspecting(true);
            setTimeout(() => {
                if (!flag) {
                    alert('The transaction wasn\'t included in the span of 10 sec (Network Or Connectivity Problem)');
                    setCINE('');
                    return;
                }
            }, 10000);
            console.log('inspecting...');
            blockNum = await provider.getBlockNumber();
            console.log(blockNum);
            const transaction = await oracleContract.createRequest(cine);
            await transaction.wait().then(() => {
                flag = !flag
            });
            console.log(transaction.hash);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      if (inspecting === true) {
        // let firstOracleFlag = false;
        // let secondOracleFlag = false;
        // setTimeout(() => {
        //         if ((!firstOracleFlag || !secondOracleFlag) && inspecting === true) {
        //             alert("One oracle or both didn't respond");
        //             setInspecting(false);
        //             setCINE('');
        //             return;
        //         }
        //   }, 20000);

         let prm = false;
          oracleContract.on("responseByOracle1", async (_cine, event) => {
            console.log('1 ', event.blockNumber, blockNum);
                if (event.blockNumber >= blockNum) {
                    console.log("oracle1 answered");
                    // firstOracleFlag = !firstOracleFlag;
                    if (prm) {
                      console.log('event detected');
                      const assureData = await oracleContract.getInsuredData(_cine);
                      setAssure(assureData);
                      const lastRegime = await oracleContract.dernierRegime(_cine);
                      setDernierRegime(lastRegime);
                      const result = await oracleContract.allocationAC(_cine);
                      setIsEligible(result[0]);
                      setRegime(result[1]);
                      setInspecting(false);
                    }
                    prm = !prm;
                    oracleContract.off("responseByOracle1");
                }
            });
            oracleContract.on("responseByOracle2", async (_cine, event) => {
                console.log('2 ', event.blockNumber, blockNum);
                if (event.blockNumber >= blockNum) {
                    console.log("oracle2 answered");
                    // secondOracleFlag = !secondOracleFlag;
                    if (prm) {
                      console.log('event detected');
                      const assureData = await oracleContract.getInsuredData(_cine);
                      setAssure(assureData);
                      const dRegime = await oracleContract.dernierRegime(_cine);
                      setDernierRegime(dRegime);
                      const result = await oracleContract.allocationAC(_cine);
                      setIsEligible(result[0]);
                      setRegime(result[1]);
                      setInspecting(false);
                    }
                    prm = !prm;
                    oracleContract.off("responseByOracle2");
                }
            });
          }
      // eslint-disable-next-line
    }, [inspecting]);

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">
                    Inspection de l'assuré
                </div>
                <br/><br/>
            <>
            <textarea
                value={cine}
                placeholder="Enter CINE de l'assuré"
                onChange={event => setCINE(event.target.value)}
                className="box"
            />
            <button className="inspectButton" onClick={inspect}>
                Inspect
            </button>

            { inspecting &&
                <>
                    <br/><br/><br/>
                    <h2>Inspection...</h2>
                </>
            }
            <br/><br/><br/>
            {(!inspecting && assure.length !== 0) &&
                <>
                    { isEligible &&
                        <>
                            <h2>Dernier Regime : {dernierRegime}</h2>
                            <br/><br/>
                            <h2>L'assuré est eligible de bénéficier des allocations ACs est le regime responsable de les payer est : {regime}</h2>
                        </>
                    }
                    { !isEligible &&
                        <>
                            <h2>Dernier Regime : {dernierRegime}</h2>
                            <br/><br/>
                            <h2>L'assuré n'est pas eligible de bénéficier des allocations ACs</h2>
                        </>
                    }
                    <br/><br/><br/>
                    { render === false && 
                        <button className="inspectButton" onClick={() => {setRender(true)}}>
                            Les infos de l'assuré
                        </button>
                    }
                    { render === true && 
                        <>
                            <br/><br/><br/>
                            <p><b>CINE</b> : {cine}</p>
                            <p><b>Nom et prenom</b> : {assure.PrenomAssure + " " + assure.NomAssure}</p>
                            <p><b>Num Identifiant</b> : {assure.NumIdentifiant}</p>
                            <p><b>Situation Matrimoniale</b> : {assure.SitMatrimoniale}</p>
                            <p><b>Status De Vie</b> : {assure.StatusDeVie}</p>
                            <p><b>Genre Assure</b> : {assure.GenreAssure}</p>
                            <p><b>Assure Beneficie AF BankA</b> : {Boolean(assure.AssureBeneficieAFBankA) ? "Oui" : "Non"}</p>
                            <p><b>Date Derniere Cotisation BankA</b> : {(new Date(Number(assure.DateDerniereCotisationBankA * 1000))).toString()}</p>
                            <p><b>Date Debut Paiement AF BankA</b> : {(new Date(Number(assure.DateDebPaiementAFBankA * 1000))).toString()}</p>
                            <p><b>Date Fin Paiement AF BankA</b> : {(new Date(Number(assure.DateFinPaiementAFBankA * 1000))).toString()}</p>
                            <p><b>Nombre Employes BankA</b> : {Number(assure.NombreEmployesBankA)}</p>
                            <p><b>Assure Beneficie AF BankB</b> : {Boolean(assure.AssureBeneficieAFBankB) ? "Oui" : "Non"}</p>
                            <p><b>Date Derniere Cotisation BankB</b> : {(new Date(Number(assure.DateDerniereCotisationBankB * 1000))).toString()}</p>
                            <p><b>Date Debut Paiement AF BankB</b> : {(new Date(Number(assure.DateDebPaiementAFBankB * 1000))).toString()}</p>
                            <p><b>Date Fin Paiement AF BankB</b> : {(new Date(Number(assure.DateFinPaiementAFBankB * 1000))).toString()}</p>
                            <p><b>Nombre Employes BankB</b> : {Number(assure.NombreEmployesBankB)}</p>
                            <br/>
                            <p><b>Type Identifiant Conjoint</b> : {assure.TypeIdentifiantConjoint}</p>
                            <p><b>Num Identifiant Conjoint</b> : {assure.NumIdentifiantConjoint}</p>
                            <p><b>Nom et Prenom Conjoint</b> : {assure.NomConjoint + " " + assure.PrenomConjoint}</p>
                            <p><b>Situation Mtrimoniale Conjoint</b> : {assure.SitMtrimonialeConjoint}</p>
                            <p><b>Conjoint Beneficie AF BankA</b> : {Boolean(assure.ConjointBeneficieAFBankA) ? "Oui" : "Non"}</p>
                            <p><b>Date Derniere Cotisation Conjoint BankA</b> : {(new Date(Number(assure.DateDerncotisationConjointBankA * 1000))).toString()}</p>
                            <p><b>Date Debut Paiement Conjoint BankA</b> : {(new Date(Number(assure.DateDebpaiementConjointBankA * 1000))).toString()}</p>
                            <p><b>Date Fin Paiement Conjoint BankA</b> : {(new Date(Number(assure.DateFinpaiementConjointBankA * 1000))).toString()}</p>
                            <p><b>Nombre Employe Conjoint BankA</b> : {Number(assure.NombreEmployeConjointBankA)}</p>
                            <p><b>Conjoint Beneficie AF BankB</b> : {Boolean(assure.ConjointBeneficieAFBankB) ? "Oui" : "Non"}</p>
                            <p><b>Date Derniere Cotisation Conjoint BankB</b> : {(new Date(Number(assure.DateDerncotisationConjointBankB * 1000))).toString()}</p>
                            <p><b>Date Debut Paiement Conjoint BankB</b> : {(new Date(Number(assure.DateDebpaiementConjointBankB * 1000))).toString()}</p>
                            <p><b>Date Fin Paiement Conjoint BankB</b> : {(new Date(Number(assure.DateFinpaiementConjointBankB * 1000))).toString()}</p>
                            <p><b>Nombre Employe Conjoint BankB</b> : {Number(assure.NombreEmployeConjointBankB)}</p>
                        </>
                    }
                </>
            }   
            </>
        </div>
    </div>
    );
}
