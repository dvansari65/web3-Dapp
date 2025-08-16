import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { useMemo } from "react";
import AirDrop from "./AirDrop";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {

  
const wallets = useMemo(()=>[
  new PhantomWalletAdapter()
],[])
  return (
    <>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            
            <main className="w-full h-screen  flex justify-center items-center ">
            <div className="flex flex-col gap-4 justify-start">
            <WalletMultiButton />
            <WalletDisconnectButton />
              <AirDrop />
            </div>
            </main>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
