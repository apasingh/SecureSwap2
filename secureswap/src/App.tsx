import { Container, Title } from '@mantine/core';
import { WalletInstallation } from "./components/organisms/WalletInstallation";
import { WalletConnect } from "./components/organisms/WalletConnect";
import './App.css'
import { ProductList } from './components/organisms/ProductList';

function App() {
  const { ethereum } = window as any;

  return (
    <div className="App">

    <div className='header' style={{ height: 60, paddingLeft: 'x1', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div><Title style={{color:'#33443C'}}> SecureSwap </Title></div>
        <div><WalletConnect/></div>
    </div>

    {!ethereum ? (
      <Container p="lg">
        <WalletInstallation />
      </Container>
    ) : <ProductList/> };
  </div>
);
};

export default App
