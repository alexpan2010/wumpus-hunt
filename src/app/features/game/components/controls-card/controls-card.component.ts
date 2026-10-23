import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";

import { GameState } from "../../../../core/game.types";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: "app-controls-card",
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: "./controls-card.component.html",
  styleUrl: "./controls-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsCardComponent {
  state = input.required<GameState>();
  action = output<
    "forward" | "left" | "right" | "shoot" | "exit" | "restart"
  >();

  terminal = computed<boolean>(() => this.state().status !== "playing");
}
