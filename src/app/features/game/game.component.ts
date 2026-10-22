import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { GameFacade } from "./game.facade";
import { BoardComponent } from "./components/board/board.component";
import { StatusCardComponent } from "./components/status-card/status-card.component";
import { ControlsCardComponent } from "./components/controls-card/controls-card.component";
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [
    BoardComponent,
    StatusCardComponent,
    ControlsCardComponent,
    ButtonComponent,
  ],
  providers: [GameFacade],
  templateUrl: "./game.component.html",
  styleUrl: "./game.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  readonly facade = inject(GameFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  constructor() {
    this.facade.start(this.route.snapshot.data["config"]);
  }

  readonly goBack = (): void => this.location.back();

  readonly onAction = (
    action: "forward" | "left" | "right" | "shoot" | "exit" | "restart",
  ): void => {
    if (action === "restart") this.facade.restart();
    else this.facade.act(action);
  };
}
