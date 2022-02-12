import { Square } from "chess.js";
import { atom } from "recoil";

export const fenState = atom({
  key: "fenState",
  default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
});

export const mouseHoverSquareState = atom({
  key: "mouseHoverSquareState",
  default: null as null | Square,
});
