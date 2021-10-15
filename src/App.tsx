import { CssBaseline, Grid, Typography } from "@mui/material";
import { ChessInstance, ShortMove } from "chess.js";
import { useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { Analyzer } from "./Analyzer";
import "./App.css";
import ChessboardWithLogic from "./Chessboard";
import { FenTextfield } from "./FenTextfield";
import { MovesBox } from "./MovesBox";
import { fenState } from "./store";
const Chess = require("chess.js");

function AppRoot() {
  const [fen, setFen] = useRecoilState(fenState);
  const [chess] = useState<ChessInstance>(new Chess(fen));
  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setFen(chess.fen());
    }
  };
  return (
    <Grid
      container
      className="App"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h1">Chess move explain</Typography>
      </Grid>
      <Grid
        container
        item
        maxWidth="1400px"
        width="90%"
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Grid
          container
          item
          alignItems="center"
          alignContent="center"
          xs={12}
          md={7}
        >
          <ChessboardWithLogic moveHandler={handleMove} />
        </Grid>
        <Grid container item direction="column" xs={12} md={5} spacing={10}>
          <FenTextfield />
          <MovesBox chess={chess} />
          <Analyzer />
        </Grid>
      </Grid>
    </Grid>
  );
}

function App() {
  return (
    <RecoilRoot>
      <CssBaseline />
      <AppRoot />
    </RecoilRoot>
  );
}

export default App;
