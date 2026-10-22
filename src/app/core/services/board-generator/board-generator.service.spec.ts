import { TestBed } from "@angular/core/testing";
import { BoardGeneratorService } from "./board-generator.service";

describe("BoardGeneratorService", () => {
  let service: BoardGeneratorService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardGeneratorService);
  });

  it("creates reserved start and exit cells and unique entity positions", () => {
    const board = service.generate({ size: 4, pits: 3, arrows: 1 }, () => 0.4);
    expect(board.hunter).toEqual({ row: 3, col: 0 });
    expect(board.exit).toEqual({ row: 0, col: 3 });
    const all = [
      board.hunter,
      board.exit,
      board.wumpus,
      board.gold,
      ...board.pits,
    ];
    expect(new Set(all.map((p) => `${p.row},${p.col}`)).size).toBe(all.length);
    expect(board.pits.length).toBe(3);
    expect(board.visited).toEqual([board.hunter]);
  });

  it("validates size, pits and arrows", () => {
    expect(() =>
      service.generate({ size: 1, pits: 0, arrows: 1 }),
    ).toThrowError(/size/);
    expect(() =>
      service.generate({ size: 3, pits: -1, arrows: 1 }),
    ).toThrowError(/Pit/);
    expect(() =>
      service.generate({ size: 3, pits: 0, arrows: -1 }),
    ).toThrowError(/Arrow/);
    expect(() =>
      service.generate({ size: 2, pits: 1, arrows: 0 }),
    ).toThrowError(/Too many pits/);
  });

  it("allows zero pits and zero arrows", () => {
    const board = service.generate({ size: 2, pits: 0, arrows: 0 });
    expect(board.pits).toEqual([]);
  });
});
