import "./App.css";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connector";
import Web3 from "web3";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Input } from "@mui/material";
import { abi } from "./contract/dc.json";
import { EthTransfer } from "./components/EthTransfer";
import ERC20Functions from "./components/ERC20Functions";

function App() {
  // web3-react hooks
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [balanceAmount, setbalanceAmount] = useState();
  const [transferFrom, settransferFrom] = useState("");

  let web3 = new Web3(
    "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8"
  );

  // let dscContractAddress = "0xF6e13B49600DeF8cd5A1F90681b95Ce02Fb16821";

  // initialize contract

  async function getBalance() {
    try {
      if (account) {
        // let contract = new web3.eth.Contract(abi, );

        let balance = await web3.eth.getBalance(account);
        let eth = web3.utils.fromWei(balance, "ether");
        setbalanceAmount(eth, "ETH");
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
      console.log(ex);
    }
  }

  useEffect(() => {
    console.log("eth", account);
    getBalance();

    // getAllAccounts();
  }, [account]);

  return (
    <div className="App">
      <h1>Eth Transactions</h1>

      <Box sx={{ marginBottom: "20px", cursor: "pointer" }}>
        {active ? (
          <Button variant="contained">Connected</Button>
        ) : (
          <Button variant="contained" onClick={connect}>
            Connect to your metamask
          </Button>
        )}
      </Box>

      <EthTransfer
        account={account}
        active={active}
        balanceAmount={balanceAmount}
        library={library}
      />

      <ERC20Functions />
    </div>
  );
}

export default App;
