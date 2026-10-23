export type Direction = "north" | "east" | "south" | "west";
export type GameStatus = "playing" | "dead-pit" | "dead-wumpus" | "won";
export type Perception =
  | "nothing"
  | "breeze"
  | "smell"
  | "glitter"
  | "breeze and smell"
  | "breeze and glitter"
  | "smell and glitter"
  | "breeze, smell and glitter"
  | "Wumpus here"
  | "bump"
  | "scream";
export interface Position {
  row: number;
  col: number;
}
export interface GameConfig {
  size: number;
  pits: number;
  arrows: number;
}
export interface GameBoard {
  size: number;
  hunter: Position;
  exit: Position;
  wumpus: Position;
  gold: Position;
  pits: Position[];
  visited: Position[];
}
export interface GameState {
  config: GameConfig;
  board: GameBoard;
  direction: Direction;
  arrowsLeft: number;
  hasGold: boolean;
  status: GameStatus;
  message: string;
  lastEvent: "none" | "bump" | "scream";
}
