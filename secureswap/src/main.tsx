import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Config, DAppProvider, Sepolia } from '@usedapp/core';
import { MantineProvider } from "@mantine/core";
import 'normalize.css';

const config: Config = {
  readOnlyChainId: Sepolia.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]: "https://sepolia.infura.io/v3/7018b8d34628491fb380004b171a78cb",
  },
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <DAppProvider config={config}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </DAppProvider>

  </React.StrictMode>,
)
