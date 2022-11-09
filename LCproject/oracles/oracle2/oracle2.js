const fetch = require('node-fetch');
const ethers = require('ethers');
require("dotenv").config();

const oracleScAbi = require('./oracleAbi/Oracle.json');

// import a web3 provider
const provider = new ethers.providers.JsonRpcProvider(process.env.nodeProvider);
// create a wallet object from the oracle private key
const wallet = new ethers.Wallet(process.env.oraclePKey, provider);
// import the oracle smart contract object
const oracleContract = new ethers.Contract(process.env.oracleScAddress, oracleScAbi, wallet);

/*
    event listner on newRequest event that triggers a call back function taking cine as argument
    & fetching the API for the data of the insured user defined by cine and submit the data to the
    smart contract by calling updateRequest()
*/
oracleContract.on("newRequest", async (cine) => {
    console.log(`CIN: ${cine}`);
    const rndInt = Math.floor(Math.random() * 999) + 1
    console.log('rnd: ', rndInt);
    // call the api endpoint with rndNum
    fetch(`http://localhost:5000/${rndInt}`)
    .then(resp => resp.json())
    .then(
        async (data) => {
            // construct the response object
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
            // call the updateRequest with cine and the response object
            const tx = await oracleContract.updateRequest(cine, response);
            // wait for the transaction to be included
            await tx.wait();
            console.log(`transactoin included with hash : ${tx.hash}`);
        }
    ).catch( (err) => {
        console.log('failure : ' + err);
    });
});