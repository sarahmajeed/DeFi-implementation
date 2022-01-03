import './App.css';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connector";
import web3 from "web3";
import { useState } from "react";
import Button from '@mui/material/Button';
import {Box} from '@mui/material';


function App() {
  // web3-react hooks
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [minting, setMinting] = useState(false);

  // Function to connect wallet
  async function connect() {
  try {
    await activate(injected);
  } catch (ex) {
    console.log(ex)
  }
  }

  async function mint() {
    setMinting(true);
    const myAccount = "0xb9eC43E9eFa48E4b9c3667E66732f521E1Bc633f"; //Account to receive payment
    const price = "0.01"; // This is the price in ETH
    
    let obj = {
      to: myAccount,
      from: account,
      value: web3.utils.toWei(price, "ether"), // Needs to be converted to Wei units
      gas: 85000, // Eth ⛽ price
      gasLimit: "100000"
    };

    await library.eth.sendTransaction(obj, async (e, tx) => {
      if (e) {
        alert(`Something went wrong! Try switching accounts - ${e}`);
        console.log("ERROR->", e);
        setMinting(false);
      } else {
        setMinting(false);
      }
    });
  }
  
  
  return (
    <div className="App">
      <h1>Defi implementation - basic transactions</h1>

      <Box sx={{marginBottom:"20px", cursor:"pointer"}}>
        {(active) ? <Button variant="contained">Connected</Button> : <Button  variant='contained' onClick={connect}>Connect to your metamask</Button>}
      </Box>
      
      <Box>
        {(active) ? <Button variant='contained' type="button" disabled={minting} onClick={mint} className="main-mint-btn">
        {(minting) ? 'Waiting confirmation.' : 'Mint'}
        </Button> : null}
      </Box>
      
        
        
    </div>
  );
}

export default App;
