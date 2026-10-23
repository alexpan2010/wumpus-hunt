import { ChangeDetectionStrategy, Component, input } from "@angular/core";

import { GameState, Position } from "../../../../core/game.types";
import { BoardCellComponent } from "../../../../shared/components/board-cell/board-cell.component";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { samePosition } from "../../../../shared/utils/positionFunctions";

@Component({
  selector: "app-board",
  standalone: true,
  imports: [CardComponent, BoardCellComponent],
  templateUrl: "./board.component.html",
  styleUrl: "./board.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  state = input.required<GameState>();

  legendItems: { label: string; symbol: string; optionalClassName?: string }[] =
    [
      {
        label: "Unexplored",
        symbol: "",
        optionalClassName: "unexplored",
      },
      {
        label: "Explored",
        symbol: "",
        optionalClassName: "explored",
      },
      {
        label: "Exit",
        symbol: "E",
      },
    ];

  get cells(): Position[] {
    const size = this.state().board.size;
    return Array.from({ length: size * size }, (_, index) => ({
      row: Math.floor(index / size),
      col: index % size,
    }));
  }

  visited(position: Position): boolean {
    return this.state().board.visited.some((p) => samePosition(p, position));
  }
}
