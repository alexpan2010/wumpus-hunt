import { TestBed } from "@angular/core/testing";
import { GameFacade } from "./game.facade";

describe("GameFacade", () => {
  let facade: GameFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [GameFacade] });
    facade = TestBed.inject(GameFacade);
  });

  it("starts a game with signal state and can act", () => {
    facade.start({ size: 4, pits: 2, arrows: 1 });
    expect(facade.state()?.board.size).toBe(4);
    expect(facade.isTerminal()).toBeFalse();
    facade.act("right");
    expect(facade.state()?.direction).toBe("east");
  });

  it("restarts with same configuration and fresh state", () => {
    facade.start({ size: 4, pits: 1, arrows: 2 });
    facade.act("right");
    facade.act("forward");
    facade.restart();
    expect(facade.state()?.direction).toBe("north");
    expect(facade.state()?.arrowsLeft).toBe(2);
  });

  it("ignores actions before starting and tracks visited cells", () => {
    facade.act("forward");
    expect(facade.state()).toBeNull();
    facade.start({ size: 3, pits: 0, arrows: 0 });
    expect(facade.isVisited({ row: 2, col: 0 })).toBeTrue();
  });
});
