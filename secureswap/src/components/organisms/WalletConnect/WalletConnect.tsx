import { Button, Group, Text} from "@mantine/core";
import { Sepolia, useEthers } from "@usedapp/core";

export const WalletConnect =() =>{
    const { activateBrowserWallet, account, deactivate, chainId, switchNetwork} = useEthers(); //makes connection accessible in whole app
    if (account) {
        if (chainId === Sepolia.chainId){
            return <Button onClick={deactivate}> Disconnect</Button>
        } else{
            return (
                <Group style={{ justifyContent: 'center' }}>
                <Text style={{ color: 'red' }}>Wrong Network</Text>
            <Button onClick={() => switchNetwork(Sepolia.chainId)}> Switch Network</Button>
            </Group>
            );
        }
        
    } else{
    return <Button onClick={activateBrowserWallet}> Connect to Metamask </Button>
}
};