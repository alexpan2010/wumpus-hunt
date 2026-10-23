import { Injectable } from "@angular/core";

import { Direction, GameState, Perception, Position } from "../../game.types";
import { samePosition } from "../../../shared/utils/positionFunctions";

@Injectable({ providedIn: "root" })
export class GameEngineService {
  turn(
    state: GameState,
    action: "forward" | "left" | "right" | "shoot" | "exit",
  ): GameState {
    if (state.status !== "playing") return state;
    switch (action) {
      case "left":
        return this.rotate(state, -1);
      case "right":
        return this.rotate(state, 1);
      case "forward":
        return this.moveForward(state);
      case "shoot":
        return this.shoot(state);
      case "exit":
        return this.exit(state);
    }
  }

  perception(state: GameState): Perception {
    if (state.lastEvent === "bump") return "bump";
    if (state.lastEvent === "scream") return "scream";

    if (samePosition(state.board.hunter, state.board.wumpus))
      return "Wumpus here";

    const breeze = state.board.pits.some((pit) =>
      this.adjacent(pit, state.board.hunter),
    );

    const smell =
      state.status !== "won" &&
      this.wumpusAlive(state) &&
      this.adjacent(state.board.wumpus, state.board.hunter);

    const glitter =
      !state.hasGold && samePosition(state.board.hunter, state.board.gold);

    const items = [
      breeze ? "breeze" : "",
      smell ? "smell" : "",
      glitter ? "glitter" : "",
    ].filter(Boolean);

    if (items.length === 0) return "nothing";
    if (items.length === 1) return items[0] as Perception;
    if (items.length === 2) return `${items[0]} and ${items[1]}` as Perception;
    return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` as Perception;
  }

  private rotate(state: GameState, delta: number): GameState {
    const directions: Direction[] = ["north", "east", "south", "west"];
    const index = directions.indexOf(state.direction);

    return {
      ...state,
      direction: directions[(index + delta + 4) % 4],
      lastEvent: "none",
      message: `Facing ${directions[(index + delta + 4) % 4]}.`,
    };
  }

  private moveForward(state: GameState): GameState {
    const delta: Record<Direction, Position> = {
      north: { row: -1, col: 0 },
      east: { row: 0, col: 1 },
      south: { row: 1, col: 0 },
      west: { row: 0, col: -1 },
    };
    const next = {
      row: state.board.hunter.row + delta[state.direction].row,
      col: state.board.hunter.col + delta[state.direction].col,
    };

    if (
      next.row < 0 ||
      next.col < 0 ||
      next.row >= state.board.size ||
      next.col >= state.board.size
    ) {
      return { ...state, lastEvent: "bump", message: "Bump! You hit a wall." };
    }

    const visited = state.board.visited.some((p) => samePosition(p, next))
      ? state.board.visited
      : [...state.board.visited, next];
    const board = { ...state.board, hunter: next, visited };

    if (state.board.pits.some((p) => samePosition(p, next)))
      return {
        ...state,
        board,
        status: "dead-pit",
        lastEvent: "none",
        message: "You fell into a bottomless pit. You died.",
      };

    if (this.wumpusAlive(state) && samePosition(state.board.wumpus, next))
      return {
        ...state,
        board,
        status: "dead-wumpus",
        lastEvent: "none",
        message: "The Wumpus caught you. You died.",
      };

    const hasGold = state.hasGold || samePosition(state.board.gold, next);

    return {
      ...state,
      board,
      hasGold,
      lastEvent: "none",
      message:
        !hasGold || state.hasGold
          ? "You moved forward."
          : "You collected the gold. Return to the exit.",
    };
  }

  private shoot(state: GameState): GameState {
    if (state.arrowsLeft <= 0)
      return { ...state, lastEvent: "none", message: "No arrows left." };

    const delta: Record<Direction, Position> = {
      north: { row: -1, col: 0 },
      east: { row: 0, col: 1 },
      south: { row: 1, col: 0 },
      west: { row: 0, col: -1 },
    };

    let row = state.board.hunter.row + delta[state.direction].row;
    let col = state.board.hunter.col + delta[state.direction].col;

    while (
      row >= 0 &&
      col >= 0 &&
      row < state.board.size &&
      col < state.board.size
    ) {
      if (
        this.wumpusAlive(state) &&
        row === state.board.wumpus.row &&
        col === state.board.wumpus.col
      ) {
        return {
          ...state,
          arrowsLeft: state.arrowsLeft - 1,
          board: { ...state.board, wumpus: { row: -1, col: -1 } },
          lastEvent: "scream",
          message: "You hear a scream. The Wumpus is dead.",
        };
      }
      row += delta[state.direction].row;
      col += delta[state.direction].col;
    }

    return {
      ...state,
      arrowsLeft: state.arrowsLeft - 1,
      lastEvent: "none",
      message: "Your arrow hit the wall.",
    };
  }

  private exit(state: GameState): GameState {
    if (!state.hasGold)
      return {
        ...state,
        lastEvent: "none",
        message: "You need the gold before you can exit.",
      };

    if (!samePosition(state.board.hunter, state.board.exit))
      return {
        ...state,
        lastEvent: "none",
        message: "You must return to the exit cell to win.",
      };

    return {
      ...state,
      status: "won",
      lastEvent: "none",
      message: "Victory! You escaped with the gold.",
    };
  }

  private adjacent(a: Position, b: Position): boolean {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) === 1;
  }

  private wumpusAlive(state: GameState): boolean {
    return state.board.wumpus.row >= 0 && state.board.wumpus.col >= 0;
  }
}
