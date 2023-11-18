const { network } = require('hardhat')
const { CDP_MANAGER_ADDRESS, VAT_ADDRESS } = require('../constants')

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log(`Deploying the CDP View contract on ${network.name}...`)
    await deploy('CDPView', {
        from: deployer,
        args: [CDP_MANAGER_ADDRESS, VAT_ADDRESS],
        log: true,
        waitConfirmations: 1
    })
    log('---------------------------------')
}

module.exports.tags = ['all', 'CDPView']