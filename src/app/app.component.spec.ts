import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it("renders header, outlet and footer branding", () => {
    expect(
      fixture.nativeElement.textContent.match(/Wumpus Hunt/g)?.length,
    ).toBe(1);
    expect(fixture.nativeElement.querySelector("router-outlet")).toBeTruthy();
  });
});
