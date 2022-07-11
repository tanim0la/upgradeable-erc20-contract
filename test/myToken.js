const { ethers, upgrades } = require('hardhat')
const { expect } = require('chai')
const compiledToken = require('../artifacts/contracts/myToken.sol/GLDToken.json')
const compiledTokenV2 = require('../artifacts/contracts/myToken.sol/GLDTokenV2.json')

let token, myToken, myTokenV2

beforeEach(async () => {
  myToken = await ethers.getContractFactory(
    compiledToken.abi,
    compiledToken.bytecode,
  )
  myTokenV2 = await ethers.getContractFactory(
    compiledTokenV2.abi,
    compiledTokenV2.bytecode,
  )
 
  token = await upgrades.deployProxy(myToken, { kind: 'uups' })
  await token.deployed()
})

describe('myToken', () => {
  it('has a name', async () => {
    const name = await token.name()

    expect(name).to.equal('Gold')
  })

  it('is upgradeable', async () => {
    const [owner] = await ethers.getSigners()

    const tokenV2 = await upgrades.upgradeProxy(token, myTokenV2)
    await tokenV2.deployed()

    await tokenV2.burn(1000)
    const bal = (await tokenV2.balanceOf(tokenV2.address)).toString()

    expect(bal).to.equal(ethers.utils.parseEther('0'))
  })
})
