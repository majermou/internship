const fetch = require('node-fetch');
const ethers = require('ethers');
require("dotenv").config();

const oracleScAbi = require('./oracleAbi/Oracle.json');

const provider = new ethers.providers.JsonRpcProvider(process.env.nodeProvider);
const wallet = new ethers.Wallet(process.env.oraclePKey, provider);
const oracleContract = new ethers.Contract(process.env.oracleScAddress, oracleScAbi, wallet);

oracleContract.on("newRequest", async (cine) => {
    console.log(`CIN: ${cine}`);
    fetch(`http://localhost:5000/${cine}`)
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
                "AssureBeneficieAFBankA": Boolean(data.assureObj.AssureBeneficieAF),
                "DateDerniereCotisationBankA": Math.floor(new Date(data.assureObj.DateDerniereCotisation).getTime() / 1000),
                "DateDebPaiementAFBankA": Math.floor(new Date(data.assureObj.DateDebPaiementAF).getTime() / 1000),
                "DateFinPaiementAFBankA": Math.floor(new Date(data.assureObj.DateFinPaiementAF).getTime() / 1000),
                "NombreEmployesBankA": data.assureObj.NombreEmployes,
                "TypeIdentifiantConjoint": data.assureObj.TypeIdentifiantConjoint,
                "NumIdentifiantConjoint": data.assureObj.NumIdentifiantConjoint,
                "NomConjoint": data.assureObj.NomConjoint,
                "PrenomConjoint": data.assureObj.PrenomConjoint,
                "SitMtrimonialeConjoint": data.assureObj.SitMtrimonialeConjoint,
                "StatusDeVieConjoint": "A",
                "ConjointBeneficieAFBankA": Boolean(data.assureObj.ConjointBeneficieAF),
                "DateDerncotisationConjointBankA": Math.floor(new Date(data.assureObj.DateDerncotisationConjoint).getTime() / 1000),
                "DateDebpaiementConjointBankA": Math.floor(new Date(data.assureObj.DateDebpaiementConjoint).getTime() / 1000),
                "DateFinpaiementConjointBankA": Math.floor(new Date(data.assureObj.DateFinpaiementConjoint).getTime() / 1000),
                "NombreEmployeConjointBankA": data.assureObj.NombreEmployeConjoint,

                "AssureBeneficieAFBankB": false,
                "DateDerniereCotisationBankB": 0,
                "DateDebPaiementAFBankB": 0,
                "DateFinPaiementAFBankB": 0,
                "NombreEmployesBankB": 0,
                "ConjointBeneficieAFBankB": false,
                "DateDerncotisationConjointBankB": 0,
                "DateDebpaiementConjointBankB": 0,
                "DateFinpaiementConjointBankB": 0,
                "NombreEmployeConjointBankB": 0,
            }
            console.log(response);
            console.log('fulfilling transaction...');
            const tx = await oracleContract.updateRequest(cine, response);
            await tx.wait();
            console.log(`transactoin included with hash : ${tx.hash}`);
        }
    ).catch (
        (err) => {
            console.log('failure : ' + err);
        }
    )
});