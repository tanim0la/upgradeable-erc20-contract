const { ethers, upgrades } = require('hardhat')
const compiledToken = require('../artifacts/contracts/myToken.sol/GLDToken.json')
const compiledTokenV2 = require('../artifacts/contracts/myToken.sol/GLDTokenV2.json')

const main = async () => {
  const myToken = await ethers.getContractFactory(
    compiledToken.abi,
    compiledToken.bytecode,
  )
  const token = await upgrades.deployProxy(myToken, { kind: uups })

  await token.deployed()

  console.log('Contract Address', token.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
