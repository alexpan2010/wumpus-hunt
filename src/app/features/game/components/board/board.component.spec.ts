import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BoardComponent } from "./board.component";
import { GameState } from "../../../../core/game.types";

const testState: GameState = {
  config: { size: 2, pits: 0, arrows: 1 },
  board: {
    size: 2,
    hunter: { row: 1, col: 0 },
    exit: { row: 0, col: 1 },
    wumpus: { row: 0, col: 0 },
    gold: { row: 1, col: 1 },
    pits: [],
    visited: [{ row: 1, col: 0 }],
  },
  direction: "north",
  arrowsLeft: 1,
  hasGold: false,
  status: "playing",
  message: "Ready",
  lastEvent: "none",
};
describe("BoardComponent", () => {
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BoardComponent);
    fixture.componentRef.setInput("state", testState);
    fixture.detectChanges();
  });

  it("renders board cells and legend", () => {
    expect(
      fixture.nativeElement.querySelectorAll("app-board-cell").length,
    ).toBe(4);
    expect(fixture.nativeElement.textContent).toContain("Unexplored");
  });

  it("reveals the fatal pit or Wumpus cell on death", () => {
    fixture.componentRef.setInput("state", {
      ...testState,
      status: "dead-pit",
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("●");
    fixture.componentRef.setInput("state", {
      ...testState,
      status: "dead-wumpus",
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("♟");
  });

  it("shows gold at the hunter position after collection", () => {
    fixture.componentRef.setInput("state", { ...testState, hasGold: true });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("◆");
  });
});
