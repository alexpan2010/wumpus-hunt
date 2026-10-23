import { TestBed } from "@angular/core/testing";

import { GameEngineService } from "./game-engine.service";
import { GameState } from "../../game.types";

function state(overrides: Partial<GameState> = {}): GameState {
  return {
    config: { size: 3, pits: 1, arrows: 1 },
    board: {
      size: 3,
      hunter: { row: 2, col: 0 },
      exit: { row: 0, col: 2 },
      wumpus: { row: 0, col: 0 },
      gold: { row: 1, col: 0 },
      pits: [{ row: 2, col: 1 }],
      visited: [{ row: 2, col: 0 }],
    },
    direction: "north",
    arrowsLeft: 1,
    hasGold: false,
    status: "playing",
    message: "Ready.",
    lastEvent: "none",
    ...overrides,
  };
}

describe("GameEngineService", () => {
  let engine: GameEngineService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    engine = TestBed.inject(GameEngineService);
  });

  it("rotates left and right", () => {
    expect(engine.turn(state(), "left").direction).toBe("west");
    expect(engine.turn(state(), "right").direction).toBe("east");
  });

  it("bumps at a wall without moving", () => {
    const result = engine.turn(state({ direction: "west" }), "forward");
    expect(result.board.hunter).toEqual({ row: 2, col: 0 });
    expect(result.lastEvent).toBe("bump");
  });

  it("kills the hunter in a pit or with the live Wumpus", () => {
    const pit = engine.turn(state({ direction: "east" }), "forward");
    expect(pit.status).toBe("dead-pit");
    const monster = engine.turn(
      state({
        board: { ...state().board, wumpus: { row: 1, col: 0 }, pits: [] },
      }),
      "forward",
    );
    expect(monster.status).toBe("dead-wumpus");
  });

  it("collects gold and tracks visited cells", () => {
    const result = engine.turn(state(), "forward");
    expect(result.hasGold).toBeTrue();
    expect(result.board.visited.length).toBe(2);
  });

  it("shoots along a ray, kills Wumpus and spends an arrow", () => {
    const result = engine.turn(
      state({
        board: { ...state().board, wumpus: { row: 0, col: 0 }, pits: [] },
      }),
      "shoot",
    );
    expect(result.arrowsLeft).toBe(0);
    expect(result.lastEvent).toBe("scream");
    expect(result.board.wumpus.row).toBe(-1);
  });

  it("spends an arrow on a miss and refuses a shot without arrows", () => {
    const miss = engine.turn(state({ direction: "east" }), "shoot");
    expect(miss.arrowsLeft).toBe(0);
    expect(engine.turn(miss, "shoot").message).toBe("No arrows left.");
  });

  it("requires gold and the exit cell for victory", () => {
    expect(engine.turn(state(), "exit").status).toBe("playing");
    const gold = state({ hasGold: true });
    expect(engine.turn(gold, "exit").status).toBe("playing");
    expect(
      engine.turn(
        state({
          hasGold: true,
          board: { ...state().board, hunter: { row: 0, col: 2 } },
        }),
        "exit",
      ).status,
    ).toBe("won");
  });

  it("does not change a terminal state", () => {
    const dead = state({ status: "dead-pit" });
    expect(engine.turn(dead, "forward")).toBe(dead);
  });

  it("reports breeze, smell, glitter, combined perception, and Wumpus here", () => {
    expect(engine.perception(state())).toBe("breeze");

    const smellState = state({
      board: { ...state().board, hunter: { row: 0, col: 1 }, pits: [] },
    });

    expect(engine.perception(smellState)).toBe("smell");

    const glitterState = state({
      board: {
        ...state().board,
        hunter: { row: 1, col: 0 },
        pits: [],
        wumpus: { row: 0, col: 2 },
      },
    });

    expect(engine.perception(glitterState)).toBe("glitter");

    const combo = state({
      board: {
        ...state().board,
        hunter: { row: 1, col: 1 },
        gold: { row: 1, col: 1 },
        pits: [{ row: 1, col: 0 }],
        wumpus: { row: 0, col: 1 },
      },
    });

    expect(engine.perception(combo)).toBe("breeze, smell and glitter");

    expect(
      engine.perception(
        state({ board: { ...state().board, hunter: { row: 0, col: 0 } } }),
      ),
    ).toBe("Wumpus here");
  });

  it("reports bump and scream events", () => {
    expect(engine.perception(state({ lastEvent: "bump" }))).toBe("bump");
    expect(engine.perception(state({ lastEvent: "scream" }))).toBe("scream");
  });
});
