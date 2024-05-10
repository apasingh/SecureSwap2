import { useContractFunction } from "@usedapp/core";
import { contract } from ".."; // Ensure this import points to where your contract instance is correctly initialized

export const usePurchaseProduct = () => {
    // This line specifies that we are interacting with the purchaseProduct function from our smart contract
    // To change the function we interact with, we would need to pass in the function name of that function
    const { state, send } = useContractFunction(contract, "purchaseProduct");

    // These are from the useDapp library, allow us to check what the status of a transaction is
    const loading = state.status === "PendingSignature" || state.status === "Mining";
    const success = state.status === "Success";
    const error = state.status === "Fail" || state.status === "Exception";

    return {
        loading,
        success,
        error,
        send
    };
};
