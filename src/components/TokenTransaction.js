import React, { useState, useEffect } from "react";
import { getName, getDSCBalance, transferToken } from "../contract/functions";
import { Input, Box, Button } from "@mui/material";

const TokenTransaction = ({ account }) => {
  const [dsc, setdsc] = useState(0);
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [dscAmounttoTransfer, setdscAmounttoTransfer] = useState(0);

  const transferDSC = async () => {
    await transferToken(account, address, dscAmounttoTransfer);
  };

  useEffect(() => {
    async function getAll() {
      const [dscName, amount] = await Promise.all([
        getName(),
        getDSCBalance(account),
      ]);

      setname(dscName);
      setdsc(amount);

      console.log(name, dsc);
    }

    getAll();
  }, [account, dsc, dscAmounttoTransfer]);

  return (
    <div>
      <h1>DSC ERC20 Functions</h1>
      <p>
        <b>DSC Balance:</b> {dsc}
      </p>
      <p>
        <b>Name of token:</b>
        {name}
      </p>

      {/* <p>
        <b>Name:</b>
        {name ? name : null}
      </p> */}

      <h2>Transfer DSC Token</h2>
      <Input
        sx={{ marginRight: 10 }}
        placeholder="Transfer From"
        value={account}
        // onChange={(e) => settransferFrom(e.target.value)}
      />

      <Input
        sx={{ marginRight: 10 }}
        placeholder="Transfer To"
        value={address}
        onChange={(e) => setaddress(e.target.value)}
      />

      <Input
        placeholder="DSC Value to Transfer"
        value={dscAmounttoTransfer}
        onChange={(e) => setdscAmounttoTransfer(e.target.value)}
      />

      <Box>
        <Button
          sx={{ marginTop: 4 }}
          variant="contained"
          type="button"
          disabled={!address.length ? true : false}
          onClick={transferDSC}
        >
          Transfer DSC
        </Button>
      </Box>
    </div>
  );
};

export default TokenTransaction;
