const { network, ethers } = require('hardhat')
const { setBalance } = require('@nomicfoundation/hardhat-network-helpers')
const { MCD_ADDRESS, MCD_VAT_ADDRESS } = require('../constants')

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    await setBalance(deployer, 100n ** 18n)

    console.log((await ethers.provider.getBalance(deployer)).toString())
    console.log('ssssssss')

    log(`Deploying the CDP View contract on ${network.name}...`)
    await deploy('CDPView', {
        from: deployer,
        args: [MCD_ADDRESS, MCD_VAT_ADDRESS],
        log: true,
        waitConfirmations: 1
    })
    log('---------------------------------')
}

module.exports.tags = ['all', 'CDPView']