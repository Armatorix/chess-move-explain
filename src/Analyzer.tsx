import { Chip, Grid, Stack, Typography } from "@mui/material";
import { ChessInstance, PieceType, Square } from "chess.js";
import { useRecoilValue } from "recoil";
import { mouseHoverSquareState } from "./store";
import { Icon } from "@iconify/react";

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
  GetPieceByField: any;
};

export function Analyzer(props: { chess: ChessInstance }) {
  const state = getBoardState(props.chess);
  const hoverSqaure = useRecoilValue(mouseHoverSquareState);
  const hoverPiece = state.GetPieceByField(hoverSqaure) as Piece | null;
  return (
    <Grid>
      <Grid>
        {hoverPiece && (
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">About {hoverSqaure}</Typography>
            <Stack alignItems="center" direction="row" spacing={2}>
              {hoverPiece.Attacks.map((p) => (
                <Chip
                  label={"Attacks " + p.Field}
                  icon={<Icon icon="akar-icons:double-sword" />}
                  color="warning"
                  variant="outlined"
                  size="small"
                />
              ))}
              {hoverPiece.Defends.map((p) => (
                <Chip
                  label={"Defends " + p.Field}
                  icon={<Icon icon="bi:shield" />}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
          </Grid>
        )}
        {/* <Typography variant="h5">Tactics</Typography> */}
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
          setBishopDefendsAndAttacks(s, p1);
          break;
        case "r":
          setRookDefendsAndAttacks(s, p1);
          break;
        case "q":
          setQueenDefendsAndAttacks(s, p1);
          break;
        case "k":
          setKingDefendsAndAttacks(s, p1);
          break;
        case "p":
          setPawnDefendsAndAttacks(s, p1);
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
    GetPieceByField: function (field: Square | null): Piece | null {
      if (field === null) {
        return null;
      }
      const col = field.charCodeAt(0) - "a".charCodeAt(0);
      const row = 7 - (field.charCodeAt(1) - "1".charCodeAt(0));
      return this.GetPiece(col, row);
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

function setKingDefendsAndAttacks(s: BoardState, p1: Piece) {
  for (const i of [1, 0, -1]) {
    for (const j of [1, 0, -1]) {
      if (i === 0 && j === 0) {
        continue;
      }
      const col = p1.Col + i;
      const row = p1.Row + j;
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
}

function setBishopDefendsAndAttacks(s: BoardState, p1: Piece) {
  for (const i of [1, -1]) {
    for (const j of [1, -1]) {
      let col = p1.Col;
      let row = p1.Row;
      let p2 = {} as Piece;
      do {
        col += i;
        row += j;
        p2 = s.GetPiece(col, row);
      } while (boardRange(col) && boardRange(row) && p2 === null);
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
}

function setRookDefendsAndAttacks(s: BoardState, p1: Piece) {
  for (const i of [-1, 0, 1]) {
    for (const j of [-1, 0, 1]) {
      if (j * i !== 0 || (j === 0 && i === 0)) {
        continue;
      }
      let col = p1.Col;
      let row = p1.Row;
      let p2 = {} as Piece;
      do {
        col += i;
        row += j;
        p2 = s.GetPiece(col, row);
      } while (boardRange(col) && boardRange(row) && p2 === null);
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
}

function setPawnDefendsAndAttacks(s: BoardState, p1: Piece) {
  // TODO add handling for en passant
  let col = p1.Col;
  let row = p1.Row;
  if (p1.Color === White) {
    row -= 1;
  } else {
    row += 1;
  }
  for (const i of [-1, 1]) {
    let p2 = s.GetPiece(col + i, row);
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

function setQueenDefendsAndAttacks(s: BoardState, p1: Piece) {
  for (const i of [-1, 0, 1]) {
    for (const j of [-1, 0, 1]) {
      if (j === 0 && i === 0) {
        continue;
      }
      let col = p1.Col;
      let row = p1.Row;
      let p2 = {} as Piece;
      do {
        col += i;
        row += j;
        p2 = s.GetPiece(col, row);
      } while (boardRange(col) && boardRange(row) && p2 === null);
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
}
function boardRange(i: number): Boolean {
  return i <= 7 && i >= 0;
}

// REFACTOR NOTES:
// bishops/rooks/queens got same algorithm for finding attacks/defs
//
