import { ShortMove, Square } from "chess.js";
import Chessboard from "chessboardjsx";
import { useRecoilState, useRecoilValue } from "recoil";
import { fenState, mouseHoverSquareState } from "./store";

export default function ChessboardWithLogic(props: {
  moveHandler: (move: ShortMove) => void;
}) {
  const fen = useRecoilValue(fenState);
  const [hoverSquare, setHoverSquare] = useRecoilState(mouseHoverSquareState);
  const squareStyle =
    hoverSquare === null ? {} : { [hoverSquare]: { backgroundColor: "red" } };
  return (
    <Chessboard
      position={fen}
      onDrop={(move) =>
        props.moveHandler({
          from: move.sourceSquare,
          to: move.targetSquare,
          promotion: "q",
        })
      }
      onMouseOverSquare={(square: Square) => {
        setHoverSquare(square);
      }}
      // onMouseOutSquare={() => {
      //   setHoverSquare(null);
      // }}
      squareStyles={squareStyle}
    />
  );
}
