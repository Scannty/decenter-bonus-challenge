require("@nomicfoundation/hardhat-toolbox")
require('hardhat-deploy')
require('dotenv').config()

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    forkedMainnet: {
      url: process.env.INFURA_KEY
    }
  },
  namedAccounts: {
    deployer: { default: 0 },
    player: { default: 1 }
  }
};
