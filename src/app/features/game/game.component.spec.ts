import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { GameComponent } from "./game.component";

const testConfig = { size: 3, pits: 0, arrows: 1 };

describe("GameComponent", () => {
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { config: testConfig } } },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();
  });

  it("starts from resolved config and renders game controls", () => {
    expect(fixture.componentInstance.facade.state()?.config.size).toBe(3);
    expect(fixture.nativeElement.textContent).toContain("Board");
    expect(fixture.nativeElement.textContent).toContain("Move forward");
  });

  it("supports restart action", () => {
    fixture.componentInstance.onAction("restart");
    expect(fixture.componentInstance.facade.state()?.status).toBe("playing");
  });
});
