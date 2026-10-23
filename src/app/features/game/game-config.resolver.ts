import { inject } from "@angular/core";
import { Location } from "@angular/common";
import { RedirectCommand, ResolveFn, Router } from "@angular/router";

import { GameConfig } from "../../core/game.types";

export const gameConfigResolver: ResolveFn<GameConfig> = () => {
  const location = inject(Location);
  const router = inject(Router);

  const state = (router.currentNavigation()?.extras.state ??
    location.getState()) as { config?: unknown } | null;

  const config = state?.config as Partial<GameConfig> | undefined;

  if (
    config &&
    Number.isInteger(config.size) &&
    config.size! >= 2 &&
    config.size! <= 20 &&
    Number.isInteger(config.pits) &&
    config.pits! >= 0 &&
    Number.isInteger(config.arrows) &&
    config.arrows! >= 0
  ) {
    return config as GameConfig;
  }

  return new RedirectCommand(router.parseUrl("/"));
};
