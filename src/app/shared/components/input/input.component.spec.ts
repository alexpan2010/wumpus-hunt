import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, Validators } from "@angular/forms";

import { InputComponent } from "./input.component";

describe("InputComponent", () => {
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput("label", "Board size");
    fixture.componentRef.setInput("id", "size");
    fixture.componentRef.setInput(
      "control",
      new FormControl(4, {
        nonNullable: true,
        validators: [Validators.min(2)],
      }),
    );
  });

  it("renders associated label and number input", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("label").htmlFor).toBe("size");
    expect(fixture.nativeElement.querySelector("input").type).toBe("number");
  });

  it("shows validation feedback when invalid and touched", () => {
    const control = fixture.componentInstance.control();
    control.setValue(0);
    control.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(".error")).toBeTruthy();
  });
});
