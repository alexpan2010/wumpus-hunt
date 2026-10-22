import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  label = input.required<string>();
  control = input.required<FormControl<number>>();
  min = input(0);
  max = input(100);
  id = input.required<string>();
}
