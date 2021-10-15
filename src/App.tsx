import { CssBaseline, Grid, Typography } from "@mui/material";
import ChessboardWithLogic from "./Chessboard";
import "./App.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <CssBaseline/>
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
          maxWidth="1200px"
          width="80%"
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid container item xs={12} md={8}>
            <ChessboardWithLogic />
          </Grid>
          <Grid container item xs={12} md={4}>
            <Typography>Move explains</Typography>
          </Grid>
        </Grid>
      </Grid>
    </RecoilRoot>
  );
}

export default App;
