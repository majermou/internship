const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Utils Contract", function () {

    /*
            isRecentDate() function
    */

    it("Determine the most recent date util function (firstDate > secondDte)", async function () {
        const nowTime = 1659522382;
        const beginingOfTime = 0;

        const utilsContract = await ethers.getContractFactory("Utils");
        const utils = await utilsContract.deploy();
        await utils.deployed();
        const ret = await utils.isRecentDate(nowTime, beginingOfTime);
        expect(ret).to.equal(true);
    });

    it("Determine the most recent date util function (firstDate < secondDate)", async function () {
        const nowTime = 1659529010;
        const beginingOfTime = 0;

        const utilsContract = await ethers.getContractFactory("Utils");
        const utils = await utilsContract.deploy();
        await utils.deployed();
        const ret = await utils.isRecentDate(beginingOfTime, nowTime);
        expect(ret).to.equal(false);
    });

    /*
            isEqual() function
    */

    it("Comparing strigs util function (inequal strings)", async function () {
        const string1 = "Cat";
        const string2 = "Dog";

        const utilsContract = await ethers.getContractFactory("Utils");
        const utils = await utilsContract.deploy();
        await utils.deployed();
        const ret = await utils.isEqual(string1, string2);
        expect(ret).to.equal(false);
    });

    it("Comparing strigs util function (equal strings)", async function () {
        const string1 = "DOG";
        const string2 = "DOG";

        const utilsContract = await ethers.getContractFactory("Utils");
        const utils = await utilsContract.deploy();
        await utils.deployed();
        const ret = await utils.isEqual(string1, string2);
        expect(ret).to.equal(true);
    });

});
