# Decneter Soldity Challenge

This project mimics the Vault Info smart contract of the Maker DAO
protocol, deployed at address: [0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d]('https://etherscan.io/address/0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d#code')

## How to run

First install the necessary packages by running:

```
    npm install
```

You can run this contract on the mainnet, but since it is ment for testing purposes, it is meant to be executed on the forked mainnet.
All you nned to do is first start a local forked mainned node, by running:

```
    npx hardhat node
```

After this in a second terminal, you can deploy this contract by runnig:

```
    npx hardhat deploy
```

To run the tests you can either run:

```
    npx hardhat test
```

or to see the coverage of the tests:

```
    npx hardhat coverage
```

Note: The tests are only meant for the CDPView contract, since DSMath is copy from an already deployed and tested contract.

### Ps

Pozz za Decenter
