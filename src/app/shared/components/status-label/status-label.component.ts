import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-status-label",
  standalone: true,
  templateUrl: "./status-label.component.html",
  styleUrl: "./status-label.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusLabelComponent {
  status = input.required<string>();
}
