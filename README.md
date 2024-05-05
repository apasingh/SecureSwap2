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

4. Once the contract is compiled, it is ready to be deployed. Make sure you have a provider and a wallet - we used Infura as our provider, and hdwallet as our wallet. Add this information into a dotenv file, and call the information in the truffle-config.js file. We also need to install websockets - make sure to be in Node version 18 or this will not work when you try to deploy. We are also using Ganache to deploy, so the port should be set to whatever Ganache says -> in our case this is port 8000.

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

## Once the Contract is Deployed

1. Use vite to connect the frontend with the contract. Run the following code, then choose react, and choose TypeScript

```
npm create vite@latest SecureSwap --template react-ts
```

2. Install dependencies

```
npm install vite --save-dev
```

Install Mantine which is a React components library. 

```
npm install @mantine/hooks @mantine/core @mantine/form
```

For style in Mantine:

```
npm install normalize.css
```

3. To Connect to MetaMask and to create hooks we use the useDapp library. Make sure to config in main.tsx.

```
npm install @usedapp/core ethers
```

