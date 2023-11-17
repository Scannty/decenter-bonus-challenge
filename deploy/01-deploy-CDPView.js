const { network, ethers } = require('hardhat')
const { setBalance } = require('@nomicfoundation/hardhat-network-helpers')

const mcdAddr = '0x5ef30b9986345249bc32d8928B7ee64DE9435E39'
const mcdVatAddr = '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B'

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    await setBalance(deployer, 100n ** 18n)

    console.log((await ethers.provider.getBalance(deployer)).toString())

    log(`Deploying the CDP View contract on ${network.name}...`)
    await deploy('CDPView', {
        from: deployer,
        args: [mcdAddr, mcdVatAddr],
        log: true,
        waitConfirmations: 1
    })
    log('---------------------------------')
}