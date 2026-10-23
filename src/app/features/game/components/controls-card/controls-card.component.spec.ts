import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ControlsCardComponent } from "./controls-card.component";
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
  message: "In cave",
  lastEvent: "none",
};

describe("ControlsCardComponent", () => {
  let fixture: ComponentFixture<ControlsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlsCardComponent);
    fixture.componentRef.setInput("state", state);
    fixture.detectChanges();
  });

  it("emits a control action", () => {
    const spy = jasmine.createSpy();
    fixture.componentInstance.action.subscribe(spy);

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll("button"),
    ) as HTMLButtonElement[];

    buttons[0].click();
    expect(spy).toHaveBeenCalledWith("forward");
  });

  it("disables gameplay actions after a terminal state but allows restart", () => {
    fixture.componentRef.setInput("state", { ...state, status: "won" });
    fixture.detectChanges();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll("button"),
    ) as HTMLButtonElement[];

    expect(buttons.slice(0, 5).every((button) => button.disabled)).toBeTrue();
    expect(buttons[5].disabled).toBeFalse();
  });
});
