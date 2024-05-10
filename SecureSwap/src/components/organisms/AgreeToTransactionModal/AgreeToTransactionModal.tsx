import { Button, Group, Modal, Space, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAgreeToTransaction } from "../../../hooks/AgreeToTransaction"; // Adjust path as necessary
import { FormEvent, useEffect } from "react";

export type AgreeToTransactionModalProps = {
    opened: boolean;
    onClose: () => void;
}

export const AgreeToTransactionModal = ({ opened, onClose }: AgreeToTransactionModalProps) => {
    const form = useForm({
        initialValues: {
            productId: '',
            value: '',  // This will be entered in Ether for user convenience
        }
    });

    const { loading, success, error, send } = useAgreeToTransaction();

    useEffect(() => {
        if (success) {
            onClose(); // Close modal on successful transaction
            form.reset(); // Optionally reset form after successful transaction
        }
    }, [success, onClose, form]);

    const handleSubmit = async (values: typeof form.values, event: FormEvent<HTMLFormElement> | undefined) => {
        event?.preventDefault();  // Prevent default form submission behavior
        const valueInWei = ethers.utils.parseEther(values.value); // Convert Ether to Wei
        send(values.productId, { value: valueInWei.toHexString() });
    };

    return <Modal opened={opened} onClose={onClose} title="Agree to Transaction">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                required
                label="Product ID"
                placeholder="Enter Product ID"
                {...form.getInputProps('productId')}
            />
            <Space h="md"/>
            <TextInput
                required
                label="Value (in Ether)"
                placeholder="Amount in Ether"
                {...form.getInputProps('value')}
            />
            
            {error && (
                <>
                    <Space h="sm" />
                    <Text color="red">An error occurred: {error}</Text>
                </>
            )}

            <Group position="right" mt="md">
                <Button type="submit" loading={loading}>Agree to Transaction</Button>
            </Group>
        </form>
    </Modal>;
}
