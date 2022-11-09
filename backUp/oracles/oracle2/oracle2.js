const fetch = require('node-fetch');
const ethers = require('ethers');
require("dotenv").config();

const oracleScAbi = require('./oracleAbi/Oracle.json');

const provider = new ethers.providers.JsonRpcProvider(process.env.nodeProvider);
const wallet = new ethers.Wallet(process.env.oraclePKey, provider);
const oracleContract = new ethers.Contract(process.env.oracleScAddress, oracleScAbi, wallet);

oracleContract.on("newRequest", async (cine) => {
    console.log(`CIN: ${cine}`);
    fetch(`http://localhost:5001/${cine}`)
    .then(resp => resp.json())
    .then(
        async (data) => {
            const response = {
                "NumIdentifiant": data.assureObj.NumIdentifiant,
                "NomAssure": data.assureObj.NomAssure,
                "PrenomAssure": data.assureObj.PrenomAssure,
                "SitMatrimoniale": data.assureObj.SitMatrimoniale,
                "GenreAssure": data.assureObj.GenreAssure,
                "StatusDeVie": "A",
                "AssureBeneficieAFBankB": data.assureObj.AssureBeneficieAF,
                "DateDerniereCotisationBankB": Math.floor(new Date(data.assureObj.DateDerniereCotisation).getTime() / 1000),
                "DateDebPaiementAFBankB": Math.floor(new Date(data.assureObj.DateDebPaiementAF).getTime() / 1000),
                "DateFinPaiementAFBankB": Math.floor(new Date(data.assureObj.DateFinPaiementAF).getTime() / 1000),
                "NombreEmployesBankB": data.assureObj.NombreEmployes,
                "TypeIdentifiantConjoint": data.assureObj.TypeIdentifiantConjoint,
                "NumIdentifiantConjoint": data.assureObj.NumIdentifiantConjoint,
                "NomConjoint": data.assureObj.NomConjoint,
                "PrenomConjoint": data.assureObj.PrenomConjoint,
                "SitMtrimonialeConjoint": data.assureObj.SitMtrimonialeConjoint,
                "StatusDeVieConjoint": "A",
                "ConjointBeneficieAFBankB": data.assureObj.ConjointBeneficieAF,
                "DateDerncotisationConjointBankB": Math.floor(new Date(data.assureObj.DateDerncotisationConjoint).getTime() / 1000),
                "DateDebpaiementConjointBankB": Math.floor(new Date(data.assureObj.DateDebpaiementConjoint).getTime() / 1000),
                "DateFinpaiementConjointBankB": Math.floor(new Date(data.assureObj.DateFinpaiementConjoint).getTime() / 1000),
                "NombreEmployeConjointBankB": data.assureObj.NombreEmployeConjoint,

                "AssureBeneficieAFBankA": false,
                "DateDerniereCotisationBankA": 0,
                "DateDebPaiementAFBankA": 0,
                "DateFinPaiementAFBankA": 0,
                "NombreEmployesBankA": 0,
                "ConjointBeneficieAFBankA": false,
                "DateDerncotisationConjointBankA": 0,
                "DateDebpaiementConjointBankA": 0,
                "DateFinpaiementConjointBankA": 0,
                "NombreEmployeConjointBankA": 0,
            };
            console.log(response);
            console.log('fulfilling transaction...');
            const tx = await oracleContract.updateRequest(cine, response);
            await tx.wait();
            console.log(`transactoin included with hash : ${tx.hash}`);
        }
    ).catch(
        (err) => {
            console.log('failure : ' + err);

        }
    )
});