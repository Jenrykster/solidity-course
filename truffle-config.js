const path = require('path');
const HDwalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config({ path: './.env' });
const AccountIndex = 0;
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    develop: {
      port: 8545,
    },
    ganache_local: {
      provider: function () {
        return new HDwalletProvider(
          process.env.MNEMONIC,
          'http://127.0.0.1:7545',
          AccountIndex
        );
      },
      network_id: 5777,
    },
    goerli_infura: {
      provider: function () {
        return new HDwalletProvider(
          process.env.MNEMONIC,
          'https://goerli.infura.io/v3/cd3ded1332ab4b4fb44f682a681a3007',
          AccountIndex
        );
      },
      network_id: 5,
    },
    ropsten_infura: {
      provider: function () {
        return new HDwalletProvider(
          process.env.MNEMONIC,
          'wss://ropsten.infura.io/ws/v3/cd3ded1332ab4b4fb44f682a681a3007',
          AccountIndex
        );
      },
      network_id: 3,
    },
  },
  compilers: {
    solc: {
      version: '0.6.1',
    },
  },
};
