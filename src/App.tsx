import { Grid, Typography } from "@mui/material";
import "./App.css";
const Chess = require("react-chess");

function App() {
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
        maxWidth="1200px"
        width="80%"
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid container item xs={12} md={8}>
          <Chess />
        </Grid>
        <Grid container item xs={12} md={4}>
          <Typography>
            Move explains
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
