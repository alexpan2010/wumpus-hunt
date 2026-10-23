import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

import { Position } from "../../../core/game.types";
import { samePosition } from "../../utils/positionFunctions";

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
  isExit = input(false);

  isHunter = computed<boolean>(() => {
    const position = this.hunter();
    return (
      !!position && samePosition(position, { row: this.row(), col: this.col() })
    );
  });

  symbol = computed<string>(() => {
    if (this.isHunter())
      return ["won", "playing"].includes(this.hunterStatus()) ? "You" : "✖";
    if (this.isExit()) return "E";
    return "";
  });

  accessibleName = computed<string>(() => {
    if (this.isHunter())
      return `Hunter at row ${this.row()}, column ${this.col()}, ${this.hunterStatus()}`;
    if (this.isExit()) return "Exit";

    return this.visited()
      ? `Explored cell row ${this.row()}, column ${this.col()}`
      : `Unexplored cell row ${this.row()}, column ${this.col()}`;
  });
}
