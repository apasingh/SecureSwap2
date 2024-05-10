import React, { useState, useEffect } from 'react';
import { Modal, Button, Text, NumberInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { usePurchaseProduct } from '../../../hooks/PurchaseProduct'; // Ensure the path to your hooks is correct

export interface PurchaseProductModelProps {
    opened: boolean;
    onClose: () => void;
    productId: number;
    price: string; // Expected to be passed as a string representing the price in Wei
    onPurchase: (productId: number, amount: string) => void;
}

export const PurchaseProductModel: React.FC<PurchaseProductModelProps> = ({
    opened,
    onClose,
    productId,
    price,
    onPurchase,
}) => {
    const { send, loading, error } = usePurchaseProduct();
    const form = useForm({
        initialValues: {
            amount: '',
        },
        validate: {
            amount: (value) => (/^\d+$/.test(value) ? null : 'Invalid amount'),
        },
    });

    useEffect(() => {
        if (!opened) {
            form.reset(); // Reset form when modal closes
        }
    }, [opened, form]);

    const handlePurchase = async (values: typeof form.values) => {
        const { amount } = values;
        try {
            await send(productId, { value: amount });
            onPurchase(productId, amount);
            onClose(); // Close modal on successful purchase
        } catch (err) {
            console.error('Error purchasing product:', err);
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Confirm Purchase">
            <form onSubmit={form.onSubmit(handlePurchase)}>
                <Text>
                    Are you sure you want to purchase this product for {price} Wei?
                </Text>
                <NumberInput
                    required
                    label="Enter your amount in Wei"
                    placeholder="Amount in Wei"
                    {...form.getInputProps('amount')}
                />
                <Group position="right" mt="md">
                    <Button type="submit" loading={loading} disabled={loading || !form.values.amount}>
                        Confirm Purchase
                    </Button>
                </Group>
                {error && (
                    <Text color="red" size="sm">
                        Error: {error.message || 'An error occurred'}
                    </Text>
                )}
            </form>
        </Modal>
    );
};

export default PurchaseProductModel;
