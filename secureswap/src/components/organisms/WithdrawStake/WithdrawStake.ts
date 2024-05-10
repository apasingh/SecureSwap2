import { Button, Group, Modal, Space, TextInput, Text } from "@mantine/core";
import {useForm} from "@mantine/form";
// import { useListProduct } from "../../../hooks/ListProduct";
// import { StrToPrice } from "../../../utils/PriceUtils";
import { FormEvent, useEffect } from "react";
import { withdraw } from "../../../hooks/Withdraw";
import { Contract } from "ethers";
import { ERC20Interface, Falsy, useCall } from "@usedapp/core";


export type WithdrawProps = {
    opened: boolean;
    onClose: () => void;
}

function withdrawTokens(
    tokenAddress: string | Falsy,
    address: string | Falsy
) {
    const { value, error } =
    useCall(
        address &&
        tokenAddress && {
        contract: new Contract(tokenAddress, ERC20Interface), // instance of called contract
        method: "balanceOf", // Method to be called
        args: [address], // Method arguments - address to be checked for balance
        }
    ) ?? {};
    
if(error) {
    console.error(error.message)
    return undefined
}
return value?.[0]
  }

  

export const WithdrawStake = ({opened, onClose}: WithdrawProps) => {
    const form = useForm({
        initialValues:{
            product_toWithdraw: ""
        }
    });

    const { loading, success, error, send } = withdraw();

    useEffect(() => {
        if (success) {
            onClose();
        }
    }, [success]);

    const handleSubmit = async (values: typeof form.values, event: FormEvent<HTMLFormElement> | undefined) =>{
        event?.preventDefault(); // Prevent default form submission behavior
        console.log(values);
        await send(values.product_toWithdraw);
    };

    return <Modal opened={opened} onClose={onClose} title="Create a new Product">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label="Product to Withdraw" placeholder="enter product id" {...form.getInputProps("product_toWithdraw")}/>
                
                {
                    !!error && (
                        <>
                        <Space></Space>
                        <Text>An error occured...</Text>
                        </>
                    )
                }

                <Group>
                    <Button type="submit" loading={loading}> Withdraw </Button>
                </Group>
            </form>
    </Modal> 



    
    /*    
    return <Modal opened={opened} onClose={onClose} title="Create a new Product">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label="Product Description" placeholder="description" {...form.getInputProps("description")}/>
            <Space h="md"/>
            <TextInput required label="List Price (in Wei)" placeholder="10" {...form.getInputProps("price")}/>
            <TextInput required label="Deposit (in Wei)" placeholder="greater than list price" {...form.getInputProps("sellerDeposit")}/>
            
            {
                !!error && (
                    <>
                    <Space></Space>
                    <Text>An error occured...</Text>
                    </>
                )
            }

            <Group>
                <Button type="submit" loading={loading}> List </Button>
            </Group>
        </form>
    </Modal>
    */
}
