const https = require('https');
const axios = require('axios');
const ethers = require('ethers');
require("dotenv").config();

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const instance = axios.create({ httpsAgent });
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

    let headers = {
        'accept':'*/*',
        'Content-Type': 'application/json'
    }
    let body = {
        "UserName": "bchain",
        "Password": require('crypto').createHash('sha256').update(new Date().toISOString().split('T')[0].replace(/-/g,'') + "db487588-5a39-4f96-bb73-c8adba6d5473").digest('hex')
    }
    try {
        // authenticate to the api
        let res = await instance.post('https://srvapigate.cmr.intra:8082/api/af/Session/Create', body, headers);
        headers = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers':'*',
                'Access-Control-Allow-Methods':'GET,POST',
                'Access-Control-Allow-Origin':'*',
                'Authorization': `Bearer ${res.data.Token.AccessToken}`
            }
        }
        body = {
            "requeteId": 0,
            "RegimeId": "string",
            "Demandes": [
                {
                    "DemandeId": 0,
                    "TypeIdentifiant":"strign",
                    "NumIdentifiant": `${cine}`,
                    "IdentifiantInterne": "string"
                }
            ]
        }
        // fetch the api with cine as input
        res = await instance.post('https://srvapigate.cmr.intra:8082/api/af/v1/poc/demandes/save', body, headers);
        let response = {
            "NumIdentifiant": '',
            "NomAssure": '',
            "PrenomAssure": '',
            "SitMatrimoniale": '',
            "GenreAssure": '',
            "StatusDeVie": "A",
            "AssureBeneficieAFBankA": false,
            "DateDerniereCotisationBankA": 0,
            "DateDebPaiementAFBankA": 0,
            "DateFinPaiementAFBankA": 0,
            "NombreEmployesBankA": 0,
            "TypeIdentifiantConjoint": '',
            "NumIdentifiantConjoint": '',
            "NomConjoint": '',
            "PrenomConjoint": '',
            "SitMtrimonialeConjoint": '',
            "StatusDeVieConjoint": "A",
            "ConjointBeneficieAFBankA": false,
            "DateDerncotisationConjointBankA": 0,
            "DateDebpaiementConjointBankA": 0,
            "DateFinpaiementConjointBankA": 0,
            "NombreEmployeConjointBankA": 0,
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

        if (typeof res.data.Reponses !== 'undefined' && res.data.Reponses.length !== 0) {
            // construct the response object
            response = {
                "NumIdentifiant": res.data.Reponses[1].NumIdentifiant,
                "NomAssure": res.data.Reponses[1].NomAssure,
                "PrenomAssure": res.data.Reponses[1].PrenomAssure,
                "SitMatrimoniale": res.data.Reponses[1].SitMatrimoniale,
                "GenreAssure": res.data.Reponses[1].GenreAssure,
                "StatusDeVie": "A",
                "AssureBeneficieAFBankA": (res.data.Reponses[1].AssureBeneficieAF === 'O') ? true : false,
                "DateDerniereCotisationBankA": Math.floor(new Date(res.data.Reponses[1].DateDerniereCotisation).getTime() / 1000),
                "DateDebPaiementAFBankA": Math.floor(new Date(res.data.Reponses[1].DateDebPaiementAF).getTime() / 1000),
                "DateFinPaiementAFBankA": Math.floor(new Date(res.data.Reponses[1].DateFinPaiementAF).getTime() / 1000),
                "NombreEmployesBankA": res.data.Reponses[1].NombreEnfants,
                "TypeIdentifiantConjoint": res.data.Reponses[1].TypeIdentifiantConjoint,
                "NumIdentifiantConjoint": res.data.Reponses[1].NumIdentifiantConjoint,
                "NomConjoint": res.data.Reponses[1].NomConjoint,
                "PrenomConjoint": res.data.Reponses[1].PrenomConjoint,
                "SitMtrimonialeConjoint": res.data.Reponses[1].SitMtrimonialeConjoint,
                "StatusDeVieConjoint": "A",
                "ConjointBeneficieAFBankA": (res.data.Reponses[1].ConjointBeneficieAF === 'O') ? true : false,
                "DateDerncotisationConjointBankA": Math.floor(new Date(res.data.Reponses[1].DateDerncotisationConjoint).getTime() / 1000),
                "DateDebpaiementConjointBankA": Math.floor(new Date(res.data.Reponses[1].DateDebpaiementConjoint).getTime() / 1000),
                "DateFinpaiementConjointBankA": Math.floor(new Date(res.data.Reponses[1].DateFinpaiementConjoint).getTime() / 1000),
                "NombreEmployeConjointBankA": res.data.Reponses[1].NombreEnfantsConjoint,
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
        }
        console.log(response);
        console.log('fulfilling transaction...');
        // call the updateRequest with cine and the response object
        const tx = await oracleContract.updateRequest(cine, response);
        // wait for the transaction to be included
        await tx.wait();
        console.log(`transactoin included with hash : ${tx.hash}`);
    } catch(err) {
        console.log('failure :' + err);
    }
});
