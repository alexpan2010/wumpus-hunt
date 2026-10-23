import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StatusLabelComponent } from "./status-label.component";

describe("StatusLabelComponent", () => {
  let fixture: ComponentFixture<StatusLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusLabelComponent);
    fixture.componentRef.setInput("status", "won");
  });

  it("renders the current status", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("won");
  });
});
