import { useContractFunction } from "@usedapp/core"
import { contract } from ".."

export const useListProduct = () => {
    //this line specifies that we are interacting with the listproduct function from our smart contract
    //to change the function we interact with, we would need to pass in the function name of that function
    const { state, send } = useContractFunction (contract, "listProduct");
    //these are from useDapp library, allow us to check what the status of a transaction is
    const loading = state.status === "PendingSignature" || state.status === "Mining";
    const success = state.status === "Success";
    const error = state.status === "Fail" || state.status === "Exception";
    return {
        loading, success, error, send
    }
}
