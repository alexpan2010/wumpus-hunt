import { Injectable } from "@angular/core";
import {
  GameBoard,
  GameConfig,
  Position,
  samePosition,
} from "../../game.types";

@Injectable({ providedIn: "root" })
export class BoardGeneratorService {
  generate(config: GameConfig, random: () => number = Math.random): GameBoard {
    this.validate(config);
    const size = config.size;
    const hunter = { row: size - 1, col: 0 };
    const exit = { row: 0, col: size - 1 };
    const available: Position[] = [];

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const position = { row, col };
        if (!samePosition(position, hunter) && !samePosition(position, exit))
          available.push(position);
      }
    }

    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }

    const [wumpus, gold, ...remaining] = available;
    const pits = remaining.slice(0, config.pits);

    return { size, hunter, exit, wumpus, gold, pits, visited: [{ ...hunter }] };
  }

  validate(config: GameConfig): void {
    if (!Number.isInteger(config.size) || config.size < 2)
      throw new Error("Board size must be an integer of at least 2.");
    if (!Number.isInteger(config.pits) || config.pits < 0)
      throw new Error("Pit count must be a non-negative integer.");
    if (!Number.isInteger(config.arrows) || config.arrows < 0)
      throw new Error("Arrow count must be a non-negative integer.");
    if (config.pits > config.size * config.size - 4)
      throw new Error("Too many pits for this board size.");
  }
}
