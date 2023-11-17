const { assert, expect } = require('chai')
const { deployments, ethers, getNamedAccounts } = require('hardhat')
const { MCD_ADDRESS, MCD_VAT_ADDRESS } = require('../constants')

describe('CDP View contract unit test', () => {
    let cdpView

    beforeEach(async () => {
        const { deployer } = await getNamedAccounts()
        /* console.log(deployer) */
        /* const { CDPView } = await deployments.fixture(['all']) */
        const help = await ethers.getContractFactory('CDPView')
        console.log(help)
        cdpView = await help.deploy(MCD_ADDRESS, MCD_VAT_ADDRESS)
        /* cdpView = await ethers.getContractAt('CDPView', CDPView.address, deployer) */
        console.log(cdpView.address)
    })

    describe('dummy', () => {
        it('dummmy', () => { assert.equal(1, 1) })
    })

    describe('constructor', () => {
        it('initializes the contract correctly', async () => {
            const mcd = await cdpView.getCdpManager()

            assert.equal(MCD_ADDRESS, mcd.address)
        })
    })
})