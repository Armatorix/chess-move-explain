import { TextField } from "@mui/material";
import { useRecoilValue } from "recoil";
import { fenState } from "./store";

export function FenTextfield() {
  const fen = useRecoilValue(fenState);
  return (
    <TextField
      disabled
      multiline
      fullWidth
      id="fen-textfield"
      label="FEN"
      variant="outlined"
      value={fen}
    />
  );
}
