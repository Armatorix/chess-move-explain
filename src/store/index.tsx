import { atom } from "recoil";
import { getDefaultLibFileName } from "typescript";

export const fenState = atom({
    key: "fenState",
    default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
}
)