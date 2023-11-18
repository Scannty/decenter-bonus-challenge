const { assert, expect } = require('chai')
const { deployments, ethers } = require('hardhat')
const { CDP_MANAGER_ADDRESS, VAT_ADDRESS } = require('../constants')

/* 
    Test data from DeFi Explore for ID=10015, could have fetched it
    myeslf but it was easier this way. 
*/
const test_id = 10015
const collateral = 'ETH-A'
const adjustedDebt = ethers.utils.parseEther('27.16')
const owner = '0x960bb2943bec69737e3b57205193fdc426aee8c3'
const delta = ethers.utils.parseEther('0.1')

describe('CDP View contract unit test', () => {
    let cdpView, deployer

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
        it('correctly fetches the variables from CDP manager', async () => {
            const res = await cdpView.getCdpInfo(test_id)
            const decodedIlk = ethers.utils.parseBytes32String(res.ilk)

            assert.equal(decodedIlk, collateral)
            assert.equal((res.userAddr).toLowerCase(), owner)
            expect(res.adjustedDebt)
                .to.be.closeTo(adjustedDebt, delta)
        })
    })
})