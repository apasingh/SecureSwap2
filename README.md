# SecureSwap2
changing the dependencies from original secureswap repo, should connect frontend to backend easier


Project Members:
Aparna Singh, Maisha Miah, Ryan Chen

## To deploy a Contract

1. Install Truffle. This is the package that does the deploying

```
npm install -g truffle
```

2. Run truffle to create the basic folders. Put the solidity contract into the contracts folder

```
truffle init 
```

3. Compiles the solidity contract. The config will hold any errors if there are any. the version is usually the issue, check compilers, solc, version. Change to version 0.8.0 for our solidity contract.

```
truffle compile
```

4. Once the contract is compiled, it is ready to be deployed. Make sure you have a provider and a wallet - we used Infura as our provider, and hdwallet as our wallet. Add this information into a dotenv file, and call the information in the truffle-config.js file. We also need to install websockets - make sure to be in Node version 18 or this will not work when you try to deploy. We are also using ganache to deploy, so the port should be set to 7545 which is Ganache's default.

```
npm install @truffle/hdwallet-provider
```
```
npm install uws
```

if not already,
```
nvm use 18
```

5. Deploy the contract on the sepolia testnet.
```
truffle migrate --network sepolia
```