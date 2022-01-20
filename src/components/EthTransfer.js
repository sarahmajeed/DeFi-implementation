import { Box, Input, Button } from "@mui/material";
import React, { useState } from "react";
import Web3 from "web3";

export const EthTransfer = ({ account, active, balanceAmount, library }) => {
  const [transferTo, settransferTo] = useState("");
  const [ethToBeTrasnferred, setEthToBeTransferred] = useState(0);
  const [ethTransferred, setEthTransferred] = useState(false);

  async function transferEth() {
    setEthTransferred(true);

    let web3 = new Web3(
      "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8"
    );

    let obj = {
      to: transferTo,
      from: account,
      value: web3.utils.toWei(ethToBeTrasnferred, "ether"), // Needs to be converted to Wei units
      gas: 85000, // Eth ⛽ price
      gasLimit: "100000",
    };

    await library.eth.sendTransaction(obj, async (e, tx) => {
      if (e) {
        alert(`Something went wrong! Try switching accounts - ${e}`);
        console.log("ERROR->", e);
        setEthTransferred(false);
      } else {
        setEthTransferred(false);
        settransferTo("");
        setEthToBeTransferred(0);
      }
    });
  }
  return (
    <Box>
      {active ? (
        <Box>
          <Box>
            <Input
              sx={{ marginRight: 10 }}
              placeholder="Transfer From"
              value={account}
              // onChange={(e) => settransferFrom(e.target.value)}
            />

            <Input
              sx={{ marginRight: 10 }}
              placeholder="Transfer To"
              value={transferTo}
              onChange={(e) => settransferTo(e.target.value)}
            />

            <Input
              placeholder="Eth Value to Transfer"
              value={ethToBeTrasnferred}
              onChange={(e) => setEthToBeTransferred(e.target.value)}
            />

            <Box>
              <Button
                sx={{ marginTop: 4 }}
                variant="contained"
                type="button"
                disabled={!transferTo.length ? true : false}
                onClick={transferEth}
                className="main-mint-btn"
              >
                {ethTransferred ? "Waiting confirmation." : "Transfer Eth"}
              </Button>
            </Box>
          </Box>

          <Box>
            <p>
              Balance of {account}: <b>{balanceAmount}</b>
            </p>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
