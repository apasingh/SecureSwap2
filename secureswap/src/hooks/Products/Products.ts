import { useLogs } from "@usedapp/core";
import { useMemo } from "react";

import { contract } from "..";
// import { HexToStrColor } from "../../utils/ColorUtils";

export type ProductItem = {
    description: string, 
    price: number,
    sellerDeposit: number,
};

export const useProducts = () => {
  const logs = useLogs({
    contract,
    event: "NewFloor",
    args: [null],
  });

  const products = useMemo(() => {
    return (
      logs?.value?.map((log) => {
        const products: ProductItem = {
            description: log.data.description, 
            price: log.data.price, 
            sellerDeposit: log.data.deposit 
        };
        return products;
      }) || []
    );
  }, [logs?.value]);

  return {
    products,
  };
};