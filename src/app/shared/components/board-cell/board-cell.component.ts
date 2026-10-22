import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Position, samePosition } from "../../../core/game.types";

@Component({
  selector: "app-board-cell",
  standalone: true,
  templateUrl: "./board-cell.component.html",
  styleUrl: "./board-cell.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCellComponent {
  row = input.required<number>();
  col = input.required<number>();
  visited = input(false);
  hunter = input<Position | null>(null);
  hunterStatus = input<"playing" | "dead-pit" | "dead-wumpus" | "won">(
    "playing",
  );
  showPit = input(false);
  showWumpus = input(false);
  isGold = input(false);
  isExit = input(false);

  get isHunter(): boolean {
    const position = this.hunter();
    return (
      !!position && samePosition(position, { row: this.row(), col: this.col() })
    );
  }

  get symbol(): string {
    if (this.isHunter)
      return this.hunterStatus() === "won"
        ? "➤"
        : this.hunterStatus() === "playing"
          ? "➤"
          : "✖";
    if (this.showWumpus()) return "♟";
    if (this.showPit()) return "●";
    if (this.isGold()) return "◆";
    if (this.isExit()) return "E";
    return "";
  }

  get accessibleName(): string {
    if (this.isHunter)
      return `Hunter at row ${this.row()}, column ${this.col()}, ${this.hunterStatus()}`;
    if (this.showWumpus()) return "Wumpus";
    if (this.showPit()) return "Bottomless pit";
    if (this.isGold()) return "Gold";
    if (this.isExit()) return "Exit";

    return this.visited()
      ? `Explored cell row ${this.row()}, column ${this.col()}`
      : `Unexplored cell row ${this.row()}, column ${this.col()}`;
  }
}
