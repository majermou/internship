require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require('solidity-docgen');

module.exports = {
  solidity: "0.8.15",
  networks: {
    localChain: {
      url: `${process.env.nodeUrl}`,
      accounts: [process.env.privateKey]
    },
    rinkeby: {
      url: `${process.env.nodeProvider}`,
      accounts: [process.env.privateKey]
    }
  }
};
