import { Container, Title } from "@mantine/core";
import { WalletInstallation } from "./components/organisms/WalletInstallation";
import { WalletConnect } from "./components/organisms/WalletConnect";
import './App.css'
import { ProductList } from './components/organisms/ProductList';
import { HeaderTabs } from './components/organisms/HeaderTabs';
import {useProducts} from "./hooks/Products"; 
import { ERC20Interface, Falsy, useCall } from "@usedapp/core";
import { Contract } from "ethers";
import { WithdrawStake } from "./components/organisms/WithdrawStake";


function useTokenBalance(
  tokenAddress: string | Falsy,
  address: string | Falsy
) {
  const { value, error } =
    useCall(
      address &&
        tokenAddress && {
          contract: new Contract(tokenAddress, ERC20Interface), // instance of called contract
          method: "withdrawStake", // Method to be called
          args: [address], // Method arguments - address to be checked for balance
        }
    ) ?? {};
  if(error) {
    console.error(error.message)
    return undefined
  }
  return value?.[0]
}

function App() {
  const { ethereum } = window as any;
  const {products} = useProducts(); 

  return (

    // <div className="App">
    //   <Header
    //     height={60}
    //     px="xl"
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     <Title>SecureSwap</Title>
    //     <WalletConnect />
    //   </Header>
    //   <Container p="lg">
    //     {!ethereum ? <WalletInstallation /> : <ProductList products={products} />}
    //   </Container>
    // </div>



      <div className="App">

      {/* <HeaderTabs/>  */}

      <div className='header' style={{ height: 60, paddingLeft: 'x1', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div><Title style={{color:'#33443C', float:"left"}}> SecureSwap </Title></div>
          <div style={{float:"right"}}><WalletConnect/></div>
      </div>
      
      {/* {!ethereum ? (
        <Container p="lg">
          <WalletInstallation />
        </Container>
      ) : <ProductList floors={floors}/> } */}

      <Container p="lg">
        {!ethereum ? <WalletInstallation /> : (
          <>
            <ProductList products={products} />
            <WithdrawStake />
          </>
        )}
      </Container>
      
    </div>
  );
};

export default App


/*

import { Container, Title, Group, useMantineTheme } from "@mantine/core";
import { WalletInstallation } from "./components/organisms/WalletInstallation";
import { WalletConnect } from "./components/organisms/WalletConnect";
import './App.css'
import { ProductList } from './components/organisms/ProductList';
import { HeaderTabs } from './components/organisms/HeaderTabs';
import {useProducts} from "./hooks/Products"; 

function App() {
  const { ethereum } = window as any;
  const { products } = useProducts();
  const theme = useMantineTheme();

  return (
    <div className="App">
      <Container size="xl" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0' }}>
          <Title order={1} >SecureSwap</Title>
          <WalletConnect />
        </div>
      </Container>

      <Container p="lg">
        {!ethereum ? <WalletInstallation /> : <ProductList products={products} />}
      </Container>
    </div>
  );
};

export default App;
*/