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