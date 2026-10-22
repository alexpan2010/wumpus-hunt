import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { GameEngineService } from "../../../../core/services/game-engine/game-engine.service";
import { GameState } from "../../../../core/game.types";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { StatusLabelComponent } from "../../../../shared/components/status-label/status-label.component";

@Component({
  selector: "app-status-card",
  standalone: true,
  imports: [CardComponent, StatusLabelComponent],
  templateUrl: "./status-card.component.html",
  styleUrl: "./status-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusCardComponent {
  state = input.required<GameState>();
  constructor(private readonly engine: GameEngineService) {}

  perception(): string {
    return this.engine.perception(this.state());
  }
}
