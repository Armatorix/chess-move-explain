import { Chip, Grid, Typography } from "@mui/material";
import { ChessInstance } from "chess.js";

export function MovesBox(props: { chess: ChessInstance }) {
  return (
    <Grid>
      <Grid>
        <Typography variant="h5">Moves</Typography>
      </Grid>
      <Grid>
        {props.chess.history().map((v, i) => {
          return (
            <Chip
              key={i}
              label={v}
              color={i % 2 === 0 ? "default" : "warning"}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
