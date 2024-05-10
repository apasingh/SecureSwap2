import { Button, Card, Grid, Text } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { PurchaseProductItem } from "../../../hooks/pathToPurchaseProduct";  // Correct import path for the product item
import { AgreeToTransactionModal } from "../AgreeToTransactionModal";

export type AgreeToTransactionProps = {
  products: PurchaseProductItem[];
};

export const AgreeToTransaction = ({ products }: AgreeToTransactionProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const { account, chainId } = useEthers();

  console.log("Number of Products Available for Purchase: " + products.length);

  return (
    <>
      <Grid>
        {products.map((product, index) => (
          <Grid.Col span={4} key={index}>
            <Card shadow="sm">
              <Text>Product #{product.productId}</Text>
              <Text>Price: {product.price}</Text>
              <Text>Available: {product.available ? "Yes" : "No"}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <Button
        onClick={() => setModalOpened(true)}
        variant="light"
        radius="xl"
        disabled={!account || chainId !== 1} // Set your desired chainId for production
        style={{
          position: "fixed",
          bottom: 42,
          right: 42,
        }}
      >
        Agree to Transaction
      </Button>

      <AgreeToTransactionModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};
