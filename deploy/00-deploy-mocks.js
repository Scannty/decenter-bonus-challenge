const { network } = require('hardhat')

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (network.config.chainId == 31337) {
        log('Local network detected, deploying mocks...')
        const vatMock = await deploy('VatMock', {
            from: deployer,
            args: [],
            log: true
        })
        log('Mocks deployed!')
        await deploy("CDPManagerMock", {
            from: deployer,
            args: [vatMock.address],
            log: true
        })
    }
}

module.exports.tags = ['all', 'mocks']