import { Button, Group, Modal, Space, TextInput } from "@mantine/core";
import {useForm} from "@mantine/form";

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

    const handleSubmit = async (values: typeof form.values) =>{
        console.log(values);
    }
    
    return <Modal opened={opened} onClose={onClose} title="Create a new Product">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label="Product Description" placeholder="description" {...form.getInputProps("description")}/>
            <Space h="md"/>
            <TextInput required label="List Price" placeholder="0.0001" {...form.getInputProps("price")}/>
            <TextInput required label="Deposit" placeholder="greater than list price" {...form.getInputProps("sellerDeposit")}/>
            <Group>
                <Button type="submit"> List </Button>
            </Group>
        </form>
    </Modal>
}

//gets turned on and off by the productList.tsx component