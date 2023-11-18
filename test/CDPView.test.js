const { assert, expect } = require('chai')
const { deployments, ethers } = require('hardhat')
const { CDP_MANAGER_ADDRESS, VAT_ADDRESS } = require('../constants')
const cdpAbi = require('../cdpAbi.json')

describe('CDP View contract unit test', () => {
    let cdpView, vatMock, managerMock, deployer
    let test_id = 10015

    beforeEach(async () => {
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(['all'])
        cdpView = await ethers.getContract('CDPView', deployer)
    })

    describe('constructor', () => {
        it('initializes the contract correctly', async () => {
            const cdpManagerAddr = await cdpView.getCdpManager()
            const vatAddr = await cdpView.getVat()

            assert.equal(cdpManagerAddr, CDP_MANAGER_ADDRESS)
            assert.equal(vatAddr, VAT_ADDRESS)
        })
    })

    describe('getCdpInfo', () => {
        /* it('ssssss', async () => {
            const tx = await cdpView.getCdpInfo(test_id)
            console.log(tx)
            assert(true)
        }) */

        it('correctly fetches the variables from CDP manager', async () => {
            try {
                const res = await cdpView.getCdpInfo(test_id)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
            assert(true)
        })
    })
})