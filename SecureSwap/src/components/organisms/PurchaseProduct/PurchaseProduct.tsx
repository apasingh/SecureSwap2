import { Button } from "@mantine/core";
import { Sepolia, useEthers } from "@usedapp/core";
import { useState } from "react";
import { PurchaseProductModel } from "../organisms/PurchaseProductModel"; // Ensure this is the correct path to your component

export const PurchaseProductButton = ({ productId, price }) => {
  const [purchaseProductOpened, setPurchaseProductOpened] = useState(false);
  const { account, chainId } = useEthers();

  // Dummy function to simulate purchasing product callback
  const handlePurchase = (productId, amount) => {
    console.log(`Product ${productId} purchased with amount ${amount} Wei`);
  };

  return (
    <>
      <Button
        onClick={() => setPurchaseProductOpened(true)}
        variant="light"
        radius="xl"
        disabled={!account || chainId !== Sepolia.chainId}
        style={{
            position: "fixed",
            bottom: 42,
            right: 42,
        }}
        >
        Purchase Product
      </Button>

      <PurchaseProductModel
        opened={purchaseProductOpened}
        onClose={() => setPurchaseProductOpened(false)}
        productId={productId}
        price={price}
        onPurchase={handlePurchase}
      />
    </>
  );
};
