import { Grid, Typography } from "@mui/material";
import { ChessInstance, PieceType } from "chess.js";


interface Piece {
  Type: PieceType,
  Row: Number,
  Col: Number,
  Field: string,
  Attacks: Piece[],
  Defends: Piece[],
  Value: Number,
}

interface BoardState {
  WhitePieces: Piece[],  
  BlackPieces: Piece[],
}


export function Analyzer(props: { chess: ChessInstance }) {
  console.log(props.chess.moves());
  let xd = getBoardState(props.chess);
  console.log(xd);
  return (<Grid>
    <Grid>
      <Typography variant="h5">Tactics</Typography>
    </Grid>
  </Grid>);
}
function getBoardState(chess: ChessInstance):BoardState{
  let state:BoardState = {
    WhitePieces: [],
    BlackPieces: []
  }
  let board = chess.board();
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      let p = board[i][j]
      if (p !== null){
        let piece:Piece = {
          Type: p.type,
          Row: i,
          Col: j,
          Value: getPieceValue(p.type),
          Field: String.fromCharCode('a'.charCodeAt(0)+j, '1'.charCodeAt(0)+7-i),
          Attacks: [],
          Defends: [] 
        }

        if (p.color === 'b') {
          state.BlackPieces.push(piece);
        } else {
          state.WhitePieces.push(piece);
        }
      }
    }  
  }
  return state
}

function getPieceValue(p: PieceType): Number {
  switch (p) {
    case "p":
      return 1;
    case "n":
      return 3;
    case "b" : 
      return 3;
    case "r":
      return 5;
    case "q":
      return 9;
    case "k":
      return 2137;
  }
}
