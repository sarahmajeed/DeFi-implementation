import "./App.css";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connector";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { EthTransfer } from "./components/EthTransfer";
import { web3 } from "./contract/constants";
import TokenTransaction from "./components/TokenTransaction";

function App() {
  // web3-react hooks
  const { active, account, library, activate } = useWeb3React();
  const [balanceAmount, setbalanceAmount] = useState();

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
      <Box sx={{ marginBottom: "20px", cursor: "pointer" }}>
        {active ? (
          <Button variant="contained">Connected</Button>
        ) : (
          <Button variant="contained" onClick={connect}>
            Connect to your metamask
          </Button>
        )}
      </Box>
      {active ? (
        <div>
          <h1>Eth Transactions</h1>

          <EthTransfer
            account={account}
            active={active}
            balanceAmount={balanceAmount}
            library={library}
          />

          {/* <ERC20Functions account={account} /> */}
          <TokenTransaction account={account} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
