import { Grid, Typography } from "@mui/material";
import { ChessInstance, PieceType } from "chess.js";

const Black = 1;
const White = 0;
type Color = 1 | 0;
type Piece = {
  Type: PieceType;
  Row: number;
  Col: number;
  Field: string;
  Attacks: Piece[];
  Defends: Piece[];
  IsAttackedBy: Piece[];
  IsDefendedBy: Piece[];
  Value: number;
  Color: Color;
};

type BoardState = {
  Pieces: Array<Array<Piece>>;
  ReverseMapping: Array<Array<number>>;
  ChessInstance: ChessInstance;
  Board: any;
  GetPiece: any;
};

export function Analyzer(props: { chess: ChessInstance }) {
  let xd = getBoardState(props.chess);
  console.log(xd);
  return (
    <Grid>
      <Grid>
        <Typography variant="h5">Tactics</Typography>
      </Grid>
    </Grid>
  );
}
function getBoardState(chess: ChessInstance): BoardState {
  let state = getPositions(chess);
  setDefendsAndAttacks(state);
  return state;
}

function setDefendsAndAttacks(s: BoardState) {
  for (const c of [White, Black]) {
    for (const p1 of s.Pieces[c]) {
      switch (p1.Type) {
        case "n":
          setKnightDefendsAndAttacks(s, p1);
          break;
        case "b":
          break;
        case "r":
          break;
        case "q":
          break;
        case "k":
          break;
        case "p":
          break;
      }
    }
  }
}
function getPositions(chess: ChessInstance): BoardState {
  let state: BoardState = {
    Pieces: [[], []],
    ChessInstance: chess,
    ReverseMapping: new Array(8).fill(false).map(() => new Array(8).fill(-1)),
    Board: chess.board(),
    GetPiece: function (col: number, row: number): Piece | null {
      if (!boardRange(col) || !boardRange(row)) {
        return null;
      }
      let p = this.Board[row][col];
      if (p === null) {
        return null;
      }
      return this.Pieces[p.color === "w" ? White : Black][
        this.ReverseMapping[row][col]
      ];
    },
  };
  // get pieces positions
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      let p = state.Board[i][j];
      if (p !== null) {
        let piece: Piece = {
          Type: p.type,
          Row: i,
          Col: j,
          Value: getPieceValue(p.type),
          Field: String.fromCharCode(
            "a".charCodeAt(0) + j,
            "1".charCodeAt(0) + 7 - i
          ),
          Attacks: [],
          Defends: [],
          IsAttackedBy: [],
          IsDefendedBy: [],
          Color: p.color === "w" ? White : Black,
        };
        state.ReverseMapping[i][j] = state.Pieces[piece.Color].length;
        state.Pieces[piece.Color].push(piece);
      }
    }
  }
  return state;
}

function getPieceValue(p: PieceType): number {
  switch (p) {
    case "p":
      return 1;
    case "n":
      return 3;
    case "b":
      return 3;
    case "r":
      return 5;
    case "q":
      return 9;
    case "k":
      return 2137;
  }
}
function setKnightDefendsAndAttacks(s: BoardState, p1: Piece) {
  const moves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];
  for (var i in moves) {
    const col = p1.Col + moves[i][0];
    const row = p1.Row + moves[i][1];
    let p2 = s.GetPiece(col, row);
    if (p2 === null) {
      continue;
    }
    if (p1.Color === p2.Color) {
      p1.Defends.push(p2);
      p2.IsDefendedBy.push(p1);
    } else {
      p1.Attacks.push(p2);
      p2.IsAttackedBy.push(p1);
    }
  }
}

function boardRange(i: number): Boolean {
  return i <= 7 && i >= 0;
}
