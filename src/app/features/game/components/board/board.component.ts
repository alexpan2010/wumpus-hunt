import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { GameState, Position, samePosition } from "../../../../core/game.types";
import { BoardCellComponent } from "../../../../shared/components/board-cell/board-cell.component";
import { CardComponent } from "../../../../shared/components/card/card.component";

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
  cells(): Position[] {
    const size = this.state().board.size;
    return Array.from({ length: size * size }, (_, index) => ({
      row: Math.floor(index / size),
      col: index % size,
    }));
  }

  visited(position: Position): boolean {
    return this.state().board.visited.some((p) => samePosition(p, position));
  }

  showPit(position: Position): boolean {
    return (
      this.state().status === "dead-pit" &&
      samePosition(position, this.state().board.hunter)
    );
  }

  showWumpus(position: Position): boolean {
    return (
      this.state().status === "dead-wumpus" &&
      samePosition(position, this.state().board.hunter)
    );
  }

  showGold(position: Position): boolean {
    return (
      this.state().hasGold && samePosition(position, this.state().board.hunter)
    );
  }
}
