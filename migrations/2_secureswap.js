const SecureSwap = artifacts.require("SecureSwap");

module.exports = function(deployer){
    deployer.deploy(SecureSwap);
};