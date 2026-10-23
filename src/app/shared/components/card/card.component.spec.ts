import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardComponent } from "./card.component";

describe("CardComponent", () => {
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    fixture.componentRef.setInput("title", "Board");
  });

  it("renders a titled content container", () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "Board",
    );
  });
});
