import { Button, Group, Modal, Space, TextInput, Text } from "@mantine/core";
import {useForm} from "@mantine/form";
import { useListProduct } from "../../../hooks/ListProduct";
import { StrToPrice } from "../../../utils/PriceUtils";
import { FormEvent, useEffect } from "react";

export type ProductCreationModelProps = {
    opened: boolean;
    onClose: () => void;
}

export const ProductCreationModel = ({opened, onClose}: ProductCreationModelProps) => {
    //will be open if the prop is open, on close we will tell the parents it wants to be closed

    const form = useForm({
        initialValues:{
            description: "",
            price: "",
            sellerDeposit: "",
        }
    });

    const { loading, success, error, send } = useListProduct();

    useEffect(() => {
        if (success) {
            onClose();
        }
    }, [success]);

    const handleSubmit = async (values: typeof form.values, event: FormEvent<HTMLFormElement> | undefined) =>{
        event?.preventDefault(); // Prevent default form submission behavior
        console.log(values);
        await send(values.description, StrToPrice(values.price), StrToPrice(values.sellerDeposit));
        // await send(values.description, values.price, values.sellerDeposit);
    };
    
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
}

//gets turned on and off by the productList.tsx component

//100,000,000,000,000 = 0.1 ETH