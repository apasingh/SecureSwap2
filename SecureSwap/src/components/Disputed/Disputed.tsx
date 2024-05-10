import { Button } from "@mantine/core";
import { Sepolia, useEthers } from "@usedapp/core";
import { useState } from "react";
import { DisputeTransactionModel } from "../organisms/DisputeTransactionModel";

export const Disputed = () => {
  const [DisputeTransactionOpened, setDisputeTransactionOpened] = useState(false);
  const { account, chainId } = useEthers();

  return (
    <>
      <Button
        onClick={() => setDisputeTransactionOpened(true)}
        variant="light"
        radius="xl"
        disabled={!account || chainId !== Sepolia.chainId}
        style={{
            position: "fixed",
            bottom: 42,
            right: 42,
        }}
        >
       Dispute a Transaction
        </Button>

      <DisputeTransactionModel
        opened={DisputeTransactionOpened}
        onClose={() => setDisputeTransactionOpened(false)}
      />
    
    </>
    )
};