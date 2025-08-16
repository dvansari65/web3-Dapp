import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { useState } from "react";

function AirDrop() {
  const [numberOfAirDrop, setNumberOfAirDrop] = useState<string>("");
  const wallet = useWallet();
  const { connection } = useConnection();

  const sendAirDropToUser = async () => {
    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return; // ← Added missing return
    }

    

    const solAmount = Number(numberOfAirDrop);
    try {
        const signature = await connection.requestAirdrop(wallet.publicKey,1000000000);
        console.log("Airdrop signature:", signature);
        console.log(`Explorer TX: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        console.log(`Explorer Address: https://explorer.solana.com/address/${wallet.publicKey.toString()}?cluster=devnet`);

        
    } catch (error: any) {
      console.error("Airdrop failed:", error);
      alert(`❌ Airdrop failed: ${error.message}`);
    } 
  };

  return (
    <div className="text-gray-300">
      <div className="flex flex-col gap-4">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">SOL Airdrop (Devnet)</h2>
          {wallet.connected && (
            <p className="text-sm text-gray-400 mt-2">
              Wallet: {wallet.publicKey?.toString().slice(0, 8)}...
              {wallet.publicKey?.toString().slice(-8)}
            </p>
          )}
        </div>
        
        <input
          value={numberOfAirDrop}
          onChange={(e) => setNumberOfAirDrop(e.target.value)}
          className="border border-gray-400 px-2 w-[500px] h-12 rounded-[5px] text-black"
          type="number"
          placeholder="Enter SOL amount (e.g., 1)"
        />
        
        <div className="flex justify-center w-full">
          <button
        
            onClick={sendAirDropToUser}
            className="bg-slate-500 border border-gray-400 px-5 py-2 rounded-[3px] ease-in-out duration-200 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            send
          </button>
        </div>
        
        {!wallet.connected && (
          <p className="text-center text-red-400 text-sm">
            Connect wallet to use airdrop
          </p>
        )}
      </div>
    </div>
  );
}

export default AirDrop;