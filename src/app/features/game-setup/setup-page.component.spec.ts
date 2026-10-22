import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { SetupPageComponent } from "./setup-page.component";

describe("SetupPageComponent", () => {
  let fixture: ComponentFixture<SetupPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupPageComponent);
    router = TestBed.inject(Router);

    spyOn(router, "navigate").and.resolveTo(true);

    fixture.detectChanges();
  });

  it("renders reactive setup inputs", () => {
    expect(fixture.nativeElement.textContent).toContain("Board size");
    expect(fixture.nativeElement.querySelectorAll("input").length).toBe(3);
  });

  it("navigates with valid configuration", () => {
    fixture.componentInstance.submit();
    expect(router.navigate).toHaveBeenCalledWith(["/game"], {
      state: { config: { size: 6, pits: 4, arrows: 1 } },
    });
  });

  it("does not navigate for invalid or impossible configurations", () => {
    fixture.componentInstance.form.controls.size.setValue(1);
    fixture.componentInstance.submit();
    expect(router.navigate).not.toHaveBeenCalled();

    fixture.componentInstance.form.controls.size.setValue(2);
    fixture.componentInstance.form.controls.pits.setValue(1);
    fixture.componentInstance.form.controls.pits.markAsTouched();
    fixture.componentInstance.submit();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
