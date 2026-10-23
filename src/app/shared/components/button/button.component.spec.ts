import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonComponent } from "./button.component";

describe("ButtonComponent", () => {
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput("text", "Go");
  });

  it("renders text and emits click", () => {
    const spy = jasmine.createSpy();
    fixture.componentInstance.clicked.subscribe(spy);
    fixture.detectChanges();
    (
      fixture.nativeElement.querySelector("button") as HTMLButtonElement
    ).click();
    expect(spy).toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain("Go");
  });

  it("supports outline and disabled", () => {
    fixture.componentRef.setInput("type", "outline");
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;

    expect(button.disabled).toBeTrue();
    expect(button.classList.contains("outline")).toBeTrue();

    fixture.componentRef.setInput("htmlType", "submit");
    fixture.detectChanges();
    expect(
      (fixture.nativeElement.querySelector("button") as HTMLButtonElement).type,
    ).toBe("submit");
  });
});
