const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("Oracle Contract", function () {

    /*
            dernierRegime() function
    */

    it("DernierRegime: bankA", async function () {

        const assureObj = {
            "NumIdentifiant":"J111111",
            "NomAssure":"Nakamoto",
            "PrenomAssure":"Satoshi",
            "SitMatrimoniale":"M",
            "GenreAssure":"M",
            "StatusDeVie":"A",
            "AssureBeneficieAFBankA":true,
            "DateDerniereCotisationBankA":1659533919,
            "DateDebPaiementAFBankA":0,
            "DateFinPaiementAFBankA":0,
            "NombreEmployesBankA":1,
            "AssureBeneficieAFBankB":true,
            "DateDerniereCotisationBankB":1627994319,
            "DateDebPaiementAFBankB":0,
            "DateFinPaiementAFBankB":0,
            "NombreEmployesBankB":0,
            "TypeIdentifiantConjoint":"F",
            "NumIdentifiantConjoint":"J222222",
            "NomConjoint":"Finney",
            "PrenomConjoint":"Hal",
            "SitMtrimonialeConjoint":"M",
            "StatusDeVieConjoint":"D",
            "ConjointBeneficieAFBankA":false,
            "DateDerncotisationConjointBankA":0,
            "DateDebpaiementConjointBankA":0,
            "DateFinpaiementConjointBankA":0,
            "NombreEmployeConjointBankA":0,
            "ConjointBeneficieAFBankB":false,
            "DateDerncotisationConjointBankB":0,
            "DateDebpaiementConjointBankB":0,
            "DateFinpaiementConjointBankB":0,
            "NombreEmployeConjointBankB":0
        }

        const oracleContract = await ethers.getContractFactory("Oracle");
        const oracle = await oracleContract.deploy();
        await oracle.deployed();
        await oracle.updateRequest("J111111", assureObj);
        expect(await oracle.dernierRegime("J111111")).to.equal("BankA");
    });

    it("DernierRegime: bankB", async function () {

        const assureObj = {
            "NumIdentifiant":"J111111",
            "NomAssure":"Nakamoto",
            "PrenomAssure":"Satoshi",
            "SitMatrimoniale":"M",
            "GenreAssure":"M",
            "StatusDeVie":"A",
            "AssureBeneficieAFBankA":true,
            "DateDerniereCotisationBankA":1627994319,
            "DateDebPaiementAFBankA":0,
            "DateFinPaiementAFBankA":0,
            "NombreEmployesBankA":1,
            "AssureBeneficieAFBankB":true,
            "DateDerniereCotisationBankB":1659533919,
            "DateDebPaiementAFBankB":0,
            "DateFinPaiementAFBankB":0,
            "NombreEmployesBankB":0,
            "TypeIdentifiantConjoint":"F",
            "NumIdentifiantConjoint":"J222222",
            "NomConjoint":"Finney",
            "PrenomConjoint":"Hal",
            "SitMtrimonialeConjoint":"M",
            "StatusDeVieConjoint":"D",
            "ConjointBeneficieAFBankA":false,
            "DateDerncotisationConjointBankA":0,
            "DateDebpaiementConjointBankA":0,
            "DateFinpaiementConjointBankA":0,
            "NombreEmployeConjointBankA":0,
            "ConjointBeneficieAFBankB":false,
            "DateDerncotisationConjointBankB":0,
            "DateDebpaiementConjointBankB":0,
            "DateFinpaiementConjointBankB":0,
            "NombreEmployeConjointBankB":0,
        }

        const [owner, addr1] = await ethers.getSigners();
        const oracleContract = await ethers.getContractFactory("Oracle");
        const oracle = await oracleContract.deploy();
        await oracle.deployed();
        await oracle.connect(addr1).updateRequest("J111111", assureObj);
        expect(await oracle.dernierRegime("J111111")).to.equal("BankB");
    });

    it("DernierRegime : no bank", async function () {

        const assureObj = {
            "NumIdentifiant":"J111111",
            "NomAssure":"Nakamoto",
            "PrenomAssure":"Satoshi",
            "SitMatrimoniale":"M",
            "GenreAssure":"M",
            "StatusDeVie":"A",
            "AssureBeneficieAFBankA":false,
            "DateDerniereCotisationBankA":0,
            "DateDebPaiementAFBankA":0,
            "DateFinPaiementAFBankA":0,
            "NombreEmployesBankA":1,
            "AssureBeneficieAFBankB":false,
            "DateDerniereCotisationBankB":0,
            "DateDebPaiementAFBankB":0,
            "DateFinPaiementAFBankB":0,
            "NombreEmployesBankB":0,
            "TypeIdentifiantConjoint":"F",
            "NumIdentifiantConjoint":"J222222",
            "NomConjoint":"Finney",
            "PrenomConjoint":"Hal",
            "SitMtrimonialeConjoint":"M",
            "StatusDeVieConjoint":"D",
            "ConjointBeneficieAFBankA":false,
            "DateDerncotisationConjointBankA":0,
            "DateDebpaiementConjointBankA":0,
            "DateFinpaiementConjointBankA":0,
            "NombreEmployeConjointBankA":0,
            "ConjointBeneficieAFBankB":false,
            "DateDerncotisationConjointBankB":0,
            "DateDebpaiementConjointBankB":0,
            "DateFinpaiementConjointBankB":0,
            "NombreEmployeConjointBankB":0,
        }

        const oracleContract = await ethers.getContractFactory("Oracle");
        const oracle = await oracleContract.deploy();
        await oracle.deployed();
        await oracle.updateRequest("J111111", assureObj);
        expect(await oracle.dernierRegime("J111111")).to.equal("");
    });

    /*
            allocationAC() function
    */

    it("AllocationAC: AP alive", async function () {
        const assureObj = {
            "NumIdentifiant":"J111111",
            "NomAssure":"Nakamoto",
            "PrenomAssure":"Satoshi",
            "SitMatrimoniale":"M",
            "GenreAssure":"M",
            "StatusDeVie":"A",
            "AssureBeneficieAFBankA":true,
            "DateDerniereCotisationBankA":1659533919,
            "DateDebPaiementAFBankA":0,
            "DateFinPaiementAFBankA":0,
            "NombreEmployesBankA":1,
            "AssureBeneficieAFBankB":true,
            "DateDerniereCotisationBankB":1627994319,
            "DateDebPaiementAFBankB":0,
            "DateFinPaiementAFBankB":0,
            "NombreEmployesBankB":0,
            "TypeIdentifiantConjoint":"F",
            "NumIdentifiantConjoint":"J222222",
            "NomConjoint":"Finney",
            "PrenomConjoint":"Hal",
            "SitMtrimonialeConjoint":"M",
            "StatusDeVieConjoint":"D",
            "ConjointBeneficieAFBankA":false,
            "DateDerncotisationConjointBankA":0,
            "DateDebpaiementConjointBankA":0,
            "DateFinpaiementConjointBankA":0,
            "NombreEmployeConjointBankA":0,
            "ConjointBeneficieAFBankB":false,
            "DateDerncotisationConjointBankB":0,
            "DateDebpaiementConjointBankB":0,
            "DateFinpaiementConjointBankB":0,
            "NombreEmployeConjointBankB":0
        }

        const oracleContract = await ethers.getContractFactory("Oracle");
        const oracle = await oracleContract.deploy();
        await oracle.deployed();
        await oracle.updateRequest("J111111", assureObj);
        const ret = await oracle.allocationAC("J111111");

        expect(ret[0]).to.equal(true);
        expect(ret[1]).to.equal("BankA");
    });

    it("AllocationAC: AP dead", async function () {
        const assureObj = {
            "NumIdentifiant":"J111111",
            "NomAssure":"Nakamoto",
            "PrenomAssure":"Satoshi",
            "SitMatrimoniale":"M",
            "GenreAssure":"M",
            "StatusDeVie":"D",
            "AssureBeneficieAFBankA":true,
            "DateDerniereCotisationBankA":1659533919,
            "DateDebPaiementAFBankA":0,
            "DateFinPaiementAFBankA":0,
            "NombreEmployesBankA":1,
            "AssureBeneficieAFBankB":true,
            "DateDerniereCotisationBankB":1627994319,
            "DateDebPaiementAFBankB":0,
            "DateFinPaiementAFBankB":0,
            "NombreEmployesBankB":0,
            "TypeIdentifiantConjoint":"F",
            "NumIdentifiantConjoint":"J222222",
            "NomConjoint":"Finney",
            "PrenomConjoint":"Hal",
            "SitMtrimonialeConjoint":"M",
            "StatusDeVieConjoint":"D",
            "ConjointBeneficieAFBankA":false,
            "DateDerncotisationConjointBankA":0,
            "DateDebpaiementConjointBankA":0,
            "DateFinpaiementConjointBankA":0,
            "NombreEmployeConjointBankA":0,
            "ConjointBeneficieAFBankB":false,
            "DateDerncotisationConjointBankB":0,
            "DateDebpaiementConjointBankB":0,
            "DateFinpaiementConjointBankB":0,
            "NombreEmployeConjointBankB":0
        }

        const oracleContract = await ethers.getContractFactory("Oracle");
        const oracle = await oracleContract.deploy();
        await oracle.deployed();
        await oracle.updateRequest("J111111", assureObj);
        const ret = await oracle.allocationAC("J111111");

        expect(ret[0]).to.equal(false);
        expect(ret[1]).to.equal("");
    });

    it("AllocationAC: AS eligibility if AP dead", async function () {
        const assureObj = {
            "NumIdentifiant":"J111111",
            "NomAssure":"Nakamoto",
            "PrenomAssure":"Satoshi",
            "SitMatrimoniale":"M",
            "GenreAssure":"F",
            "StatusDeVie":"A",
            "AssureBeneficieAFBankA":true,
            "DateDerniereCotisationBankA":1659533919,
            "DateDebPaiementAFBankA":0,
            "DateFinPaiementAFBankA":0,
            "NombreEmployesBankA":1,
            "AssureBeneficieAFBankB":true,
            "DateDerniereCotisationBankB":1627994319,
            "DateDebPaiementAFBankB":0,
            "DateFinPaiementAFBankB":0,
            "NombreEmployesBankB":0,
            "TypeIdentifiantConjoint":"F",
            "NumIdentifiantConjoint":"J222222",
            "NomConjoint":"Finney",
            "PrenomConjoint":"Hal",
            "SitMtrimonialeConjoint":"M",
            "StatusDeVieConjoint":"D",
            "ConjointBeneficieAFBankA":false,
            "DateDerncotisationConjointBankA":0,
            "DateDebpaiementConjointBankA":0,
            "DateFinpaiementConjointBankA":0,
            "NombreEmployeConjointBankA":0,
            "ConjointBeneficieAFBankB":false,
            "DateDerncotisationConjointBankB":0,
            "DateDebpaiementConjointBankB":0,
            "DateFinpaiementConjointBankB":0,
            "NombreEmployeConjointBankB":0
        }

        const oracleContract = await ethers.getContractFactory("Oracle");
        const oracle = await oracleContract.deploy();
        await oracle.deployed();
        await oracle.updateRequest("J111111", assureObj);
        const ret = await oracle.allocationAC("J111111");

        expect(ret[0]).to.equal(true);
        expect(ret[1]).to.equal("BankA");
    });

    it("AllocationAC: AS eligibility if AP dead & they're not subscribed to any regime", async function () {
        const assureObj = {
            "NumIdentifiant":"J111111",
            "NomAssure":"Nakamoto",
            "PrenomAssure":"Satoshi",
            "SitMatrimoniale":"M",
            "GenreAssure":"F",
            "StatusDeVie":"A",
            "AssureBeneficieAFBankA":false,
            "DateDerniereCotisationBankA":0,
            "DateDebPaiementAFBankA":0,
            "DateFinPaiementAFBankA":0,
            "NombreEmployesBankA":1,
            "AssureBeneficieAFBankB":false,
            "DateDerniereCotisationBankB":0,
            "DateDebPaiementAFBankB":0,
            "DateFinPaiementAFBankB":0,
            "NombreEmployesBankB":0,
            "TypeIdentifiantConjoint":"F",
            "NumIdentifiantConjoint":"J222222",
            "NomConjoint":"Finney",
            "PrenomConjoint":"Hal",
            "SitMtrimonialeConjoint":"M",
            "StatusDeVieConjoint":"D",
            "ConjointBeneficieAFBankA":false,
            "DateDerncotisationConjointBankA":0,
            "DateDebpaiementConjointBankA":0,
            "DateFinpaiementConjointBankA":0,
            "NombreEmployeConjointBankA":0,
            "ConjointBeneficieAFBankB":false,
            "DateDerncotisationConjointBankB":0,
            "DateDebpaiementConjointBankB":0,
            "DateFinpaiementConjointBankB":0,
            "NombreEmployeConjointBankB":0
        }

        const oracleContract = await ethers.getContractFactory("Oracle");
        const oracle = await oracleContract.deploy();
        await oracle.deployed();
        await oracle.updateRequest("J111111", assureObj);
        const ret = await oracle.allocationAC("J111111");

        expect(ret[0]).to.equal(false);
        expect(ret[1]).to.equal("");
    });


});
