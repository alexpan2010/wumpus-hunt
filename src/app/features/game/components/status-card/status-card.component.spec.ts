import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatusCardComponent } from "./status-card.component";
import { GameState } from "../../../../core/game.types";

const state: GameState = {
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
  message: "In the cave",
  lastEvent: "none",
};

describe("StatusCardComponent", () => {
  let fixture: ComponentFixture<StatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(StatusCardComponent);
    fixture.componentRef.setInput("state", state);
    fixture.detectChanges();
  });

  it("shows all status fields and message", () => {
    expect(fixture.nativeElement.textContent).toContain("Facing");
    expect(fixture.nativeElement.textContent).toContain("Arrows left");
    expect(fixture.nativeElement.textContent).toContain("In the cave");
  });
});
