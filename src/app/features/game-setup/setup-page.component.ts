import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { ButtonComponent } from "../../shared/components/button/button.component";
import { CardComponent } from "../../shared/components/card/card.component";
import { InputComponent } from "../../shared/components/input/input.component";

@Component({
  selector: "app-setup-page",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    CardComponent,
    InputComponent,
  ],
  templateUrl: "./setup-page.component.html",
  styleUrl: "./setup-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupPageComponent {
  private readonly router = inject(Router);
  readonly form = new FormGroup({
    size: new FormControl(6, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(2),
        Validators.max(20),
        Validators.pattern(/^\d+$/),
      ],
    }),
    pits: new FormControl(4, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(396),
        Validators.pattern(/^\d+$/),
      ],
    }),
    arrows: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(400),
        Validators.pattern(/^\d+$/),
      ],
    }),
  });

  get pitsExceedBoard(): boolean {
    return (
      this.form.controls.pits.value > this.form.controls.size.value ** 2 - 4
    );
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.pitsExceedBoard) return;

    void this.router.navigate(["/game"], {
      state: { config: this.form.getRawValue() },
    });
  }
}
