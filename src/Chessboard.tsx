import { ShortMove } from "chess.js";
import Chessboard from "chessboardjsx";
import { useRecoilValue } from "recoil";
import { fenState } from "./store";

export default function ChessboardWithLogic(props: {
  moveHandler: (move: ShortMove) => void;
}) {
  const fen = useRecoilValue(fenState);

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
    />
  );
}
