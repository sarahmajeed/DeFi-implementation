import './App.css';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connector";
import Web3 from "web3";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { abi } from './contract/dc.json';


function App() {
  // web3-react hooks
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [minting, setMinting] = useState(false);
  const [balanceAmount, setbalanceAmount] = useState();

  let web3 = new Web3(
    "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8"
  );

  let dscContractAddress = "0xF6e13B49600DeF8cd5A1F90681b95Ce02Fb16821";

  // initialize contract

  async function getBalance() {
    try {
      if (account) {
        let contract = new web3.eth.Contract( abi, dscContractAddress);

        let balance = await contract.methods.balanceOf(account).call();
        setbalanceAmount(balance);
      }

      console.log("BALANCE", balanceAmount);
    } catch (err) {
      console.log(err);
    }
  }

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

  useEffect(() => {
   
    console.log("eth", account);
    getBalance();
  

    // getAllAccounts();
  }, [account]);
  
  
  return (
    <div className="App">
      <h1>Defi implementation - basic transactions</h1>

      <Box sx={{marginBottom:"20px", cursor:"pointer"}}>
        {(active) ? <Button variant="contained">Connected</Button> : <Button  variant='contained' onClick={connect}>Connect to your metamask</Button>}
      </Box>
      
      <Box>
        {(active) ? <Box>
          
         
          <Button variant='contained' type="button" disabled={minting} onClick={mint} className="main-mint-btn">
        {(minting) ? 'Waiting confirmation.' : 'Mint'}
          </Button>
          <Box>
            <p label htmlFor="">Transfer eth from this account to another</p>
            <p>
              Balance of {account}: <b>{balanceAmount}</b>
            </p>
          </Box>
        </Box> : null}
        
      </Box>

      <Box>
        {(active) ? <Box>
          
         
          <Button variant='contained' type="button" disabled={minting} onClick={mint} className="main-mint-btn">
        {(minting) ? 'Waiting confirmation.' : 'Transfer DSC'}
          </Button>
          <Box>
            <p label htmlFor="">Transfer DSC from this account to another</p>
            
          </Box>
        </Box> : null}
      </Box>
      
        
        
    </div>
  );
}

export default App;
