import React, { useState } from 'react';
import { Modal, Button, Text, NumberInput, Group } from '@mantine/core';
import { usePurchaseProduct } from '../../../hooks/PurchaseProduct'; // Ensure the path to your hooks is correct

export interface PurchaseProductModalProps {
    opened: boolean;
    onClose: () => void;
    productId: number;
    price: string; // Expected to be passed as a string representing the price in Wei
    onPurchase: (productId: number, amount: string) => void;
}

export const PurchaseProductModal: React.FC<PurchaseProductModalProps> = ({
    opened,
    onClose,
    productId,
    price,
    onPurchase,
}) => {
    const { send, loading, error } = usePurchaseProduct();
    const [amount, setAmount] = useState<string>('');

    const handlePurchase = async () => {
        if (!amount) return; // Validate input to ensure it's not empty

        try {
            await send(productId, { value: amount });
            onPurchase(productId, amount); // Call the onPurchase function provided by props
            onClose(); // Close modal on successful purchase
        } catch (err) {
            console.error('Error purchasing product:', err);
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Confirm Purchase">
            <Text>
                Are you sure you want to purchase this product for {price} Wei?
            </Text>
            <NumberInput
                label="Enter your amount in Wei"
                placeholder="Amount in Wei"
                value={amount}
                onChange={(value) => setAmount(value.toString())}
                required
            />
            <Group position="right" mt="md">
                <Button onClick={handlePurchase} loading={loading} disabled={loading}>
                    Confirm Purchase
                </Button>
            </Group>
            {error && (
                <Text color="red" size="sm">
                    Error: {error}
                </Text>
            )}
        </Modal>
    );
};

export default PurchaseProductModal;
