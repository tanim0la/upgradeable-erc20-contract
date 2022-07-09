require('@nomicfoundation/hardhat-toolbox')
require('@openzeppelin/hardhat-upgrades')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.9',
  networks: {
    rinkeby: {
      url: process.env.NETWORK,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
}
