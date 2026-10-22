import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BoardCellComponent } from "./board-cell.component";

describe("BoardCellComponent", () => {
  let fixture: ComponentFixture<BoardCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardCellComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BoardCellComponent);
    fixture.componentRef.setInput("row", 1);
    fixture.componentRef.setInput("col", 2);
  });

  it("renders unexplored cells as dark", () => {
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector(".cell")
        .classList.contains("visited"),
    ).toBeFalse();
  });

  it("renders the hunter and accessible location", () => {
    fixture.componentRef.setInput("hunter", { row: 1, col: 2 });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("➤");
    expect(
      fixture.nativeElement
        .querySelector("[aria-label]")
        ?.getAttribute("aria-label"),
    ).toContain("Hunter at row 1");
  });

  it("shows hazard and item symbols", () => {
    fixture.componentRef.setInput("showPit", true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("●");

    fixture.componentRef.setInput("showPit", false);
    fixture.componentRef.setInput("showWumpus", true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("♟");

    fixture.componentRef.setInput("showWumpus", false);
    fixture.componentRef.setInput("isGold", true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("◆");
  });

  it("uses death and victory styles", () => {
    fixture.componentRef.setInput("hunter", { row: 1, col: 2 });
    fixture.componentRef.setInput("hunterStatus", "dead-pit");
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector(".cell").classList.contains("dead"),
    ).toBeTrue();

    fixture.componentRef.setInput("hunterStatus", "won");
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector(".cell")
        .classList.contains("victory"),
    ).toBeTrue();
  });
});
