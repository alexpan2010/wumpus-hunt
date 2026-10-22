import { Injectable, computed, signal } from "@angular/core";
import { BoardGeneratorService } from "../../core/services/board-generator/board-generator.service";
import { GameEngineService } from "../../core/services/game-engine/game-engine.service";
import { GameConfig, GameState, Position } from "../../core/game.types";

@Injectable()
export class GameFacade {
  private readonly current = signal<GameState | null>(null);
  readonly state = this.current.asReadonly();
  readonly isTerminal = computed(() => {
    const status = this.current()?.status;
    return (
      status === "won" || status === "dead-pit" || status === "dead-wumpus"
    );
  });

  constructor(
    private readonly generator: BoardGeneratorService,
    private readonly engine: GameEngineService,
  ) {}

  start(config: GameConfig): void {
    const board = this.generator.generate(config);
    this.current.set({
      config: { ...config },
      board,
      direction: "north",
      arrowsLeft: config.arrows,
      hasGold: false,
      status: "playing",
      message: "You are in the cave.",
      lastEvent: "none",
    });
  }

  act(action: "forward" | "left" | "right" | "shoot" | "exit"): void {
    const current = this.current();
    if (current) this.current.set(this.engine.turn(current, action));
  }

  restart(): void {
    const current = this.current();
    if (current) this.start(current.config);
  }

  isVisited(position: Position): boolean {
    return (
      this.current()?.board.visited.some(
        (p) => p.row === position.row && p.col === position.col,
      ) ?? false
    );
  }
}
