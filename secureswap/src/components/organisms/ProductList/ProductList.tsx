import { Button, Card, Grid, Text } from "@mantine/core";
import { Sepolia, useEthers } from "@usedapp/core";
import { useState } from "react";
import { ProductItem } from "../../../hooks/Products/Products"; 
import { ProductCreationModel } from "../ProductCreationModel";

export type ProductListProps = {
  products: ProductItem[];
};

export const ProductList = ({ products }: ProductListProps) => {
  const [productCreationOpened, setProductCreationOpened] = useState(false);
  const { account, chainId } = useEthers();

  //console.log("Number of Products: " + products.length); 
  console.log(products);

  return (
    <>
      <Grid>
        {products.map((product, index) => (
          <Grid.Col span={4} key={index}>
            <Card shadow="sm">
              <Text>#{index}</Text>
              <Text>{product.description}</Text>
              <Text>{product.price}</Text>
              <Text>{product.sellerDeposit}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <Button
        onClick={() => setProductCreationOpened(true)}
        variant="light"
        radius="xl"
        disabled={!account || chainId !== Sepolia.chainId}
        style={{
            position: "fixed",
            bottom: 42,
            right: 42,
        }}
        >
        List a Product
        </Button>

      {/* <Button
        onClick={() => setProductCreationOpened(true)}
        variant="light"
        radius="xl"
        disabled={!account || chainId !== Sepolia.chainId}
        sx={{
          position: "fixed",
          bottom: 42,
          right: 42,
        }}
      >
        Mint a new floor
      </Button> */}
      <ProductCreationModel
        opened={productCreationOpened}
        onClose={() => setProductCreationOpened(false)}
      />
        {/* when someone clicks the list a product button, they want to sell something so the product creation opens
        <Button onClick = {() => setProductCreationOpened(true)} disabled={!account || chainId !== Sepolia.chainId} >
            List a product you want to sell!
        </Button>
        <ProductCreationModel opened={productCreationOpened} onClose={() =>setProductCreationOpened(false)}/>
        </> */}
    </>
    )
};