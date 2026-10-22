import { Routes } from "@angular/router";
import { SetupPageComponent } from "./features/game-setup/setup-page.component";
import { gameConfigResolver } from "./features/game/game-config.resolver";

export const routes: Routes = [
  { path: "", component: SetupPageComponent, title: "Wumpus Hunt — Setup" },
  {
    path: "game",
    resolve: { config: gameConfigResolver },
    loadComponent: () =>
      import("./features/game/game.component").then((m) => m.GameComponent),
    title: "Wumpus Hunt — Game",
  },
  { path: "**", redirectTo: "" },
];
