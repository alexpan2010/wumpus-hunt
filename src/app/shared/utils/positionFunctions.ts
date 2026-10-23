import { Position } from "../../core/game.types";

export function samePosition(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}
