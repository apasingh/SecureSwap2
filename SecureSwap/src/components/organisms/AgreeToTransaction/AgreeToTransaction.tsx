import { Button, Card, Grid, Text } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { TransactionItem } from "../../../hooks/Transactions/Transactions"; // transaciton needs to be set up
import { AgreeToTransactionModal } from "../AgreeToTransactionModal";

export type TransactionListProps = {
  transactions: TransactionItem[];
};

export const AgreeToTransaction = ({ transactions }: TransactionListProps) => {
  const [transactionModalOpened, setTransactionModalOpened] = useState(false);
  const { account, chainId } = useEthers();

  console.log("Number of Transactions: " + transactions.length);

  return (
    <>
      <Grid>
        {transactions.map((transaction, index) => (
          <Grid.Col span={4} key={index}>
            <Card shadow="sm">
              <Text>Transaction #{transaction.id}</Text>
              <Text>Product ID: {transaction.productId}</Text>
              <Text>Value: {transaction.value}</Text>
              <Text>Status: {transaction.status}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <Button
        onClick={() => setTransactionModalOpened(true)}
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
        opened={transactionModalOpened}
        onClose={() => setTransactionModalOpened(false)}
      />
    </>
  );
};

