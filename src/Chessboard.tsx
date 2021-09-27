import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { useRecoilState } from "recoil";
import {fenState} from "./store"

const Chess = require("chess.js");

export default function ChessboardWithLogic() {
    
    const [fen, setFen] = useRecoilState(fenState);
    const [chess] = useState<ChessInstance>(
        new Chess(fen)
      );
    
      
      const handleMove = (move: ShortMove) => {
        if (chess.move(move)) {
          setFen(chess.fen());
        }
      };
      return (
          <Chessboard
            position={fen}
            onDrop={(move) =>
              handleMove({
                from: move.sourceSquare,
                to: move.targetSquare,
                promotion: "q",
              })
            } 
          />
      )
};
