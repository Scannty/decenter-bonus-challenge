require("@nomicfoundation/hardhat-toolbox")
require('hardhat-deploy')
require('dotenv').config()

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.19" }, { version: "0.5.12" }]
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: process.env.INFURA_KEY
      },
      network_id: 1,
    }
  },
  namedAccounts: {
    deployer: { default: 0 },
    player: { default: 1 }
  }
};
