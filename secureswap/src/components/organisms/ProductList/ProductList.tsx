import { Button } from "@mantine/core";
import { useState } from "react";
import { ProductCreationModel } from "../ProductCreationModel";
import { Sepolia, useEthers } from "@usedapp/core";

export const ProductList = () => {
    //need a state to know if we want to list a product or not
    const [productCreationOpened, setProductCreationOpened] = useState(false);

    //when to disable the form in productcreationmodel
    //should disable if we don't have an account or if our chainId isn't sepolia
    const { account, chainId } = useEthers();
    return (
        //need a button to open the product creation model form, which is called through this file
        <>
        {/* when someone clicks the list a product button, they want to sell something so the product creation opens */}
        <Button onClick = {() => setProductCreationOpened(true)} disabled={!account || chainId !== Sepolia.chainId} >
            List a product you want to sell!
        </Button>
        <ProductCreationModel opened={productCreationOpened} onClose={() =>setProductCreationOpened(false)}/>
        </>
    )
};