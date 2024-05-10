import { Button, Group, Modal, Space, TextInput, Text } from "@mantine/core";
import {useForm} from "@mantine/form";
import { FormEvent, useEffect } from "react";
import { DisputeTransaction } from "../../../hooks/DisputeTransaction";

export type DisputeModelProps = {
    opened: boolean;
    onClose: () => void;
}

export const DisputeTransactionModel = ({opened, onClose}: DisputeModelProps) => {
    //will be open if the prop is open, on close we will tell the parents it wants to be closed

    const form = useForm({
        initialValues:{
            _productId: "",
            _reason: "",
        }
    });

    const { loading, success, error, send } = DisputeTransaction();

    useEffect(() => {
        if (success) {
            onClose();
        }
    }, [success]);

    const handleSubmit = async (values: typeof form.values, event: FormEvent<HTMLFormElement> | undefined) =>{
        event?.preventDefault(); // Prevent default form submission behavior
        console.log(values);
        await send(values._productId, values._reason);
        // await send(values._productId);
    };
    
    return <Modal opened={opened} onClose={onClose} title="Unhappy? Dispute a Transaction">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput required label="ProductId" placeholder="01" {...form.getInputProps("_productId")}/>
            <TextInput label="Reason" placeholder="torn" {...form.getInputProps("_reason")}/>
            {
                !!error && (
                    <>
                    <Space></Space>
                    <Text>An error occured...</Text>
                    </>
                )
            }
            <Group>
                <Button type="submit" loading={loading}> DisputeTransaction </Button>
            </Group>
        </form>
    </Modal>
}

//gets turned on and off by the productList.tsx component

//100,000,000,000,000 = 0.1 ETH