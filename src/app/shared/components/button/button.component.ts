import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";

@Component({
  selector: "app-button",
  standalone: true,
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  text = input.required<string>();
  type = input<"contained" | "outline">("contained");
  htmlType = input<"button" | "submit" | "reset">("button");
  disabled = input(false);
  clicked = output<void>();
}
