# Wumpus Hunt

A client-side Angular single-page implementation of Hunt the Wumpus. The project is named `wumpus-hunt`.

## Requirements

- Node.js 20.19+ or a Node.js release supported by the selected Angular CLI version.
- npm.
- Chrome or Chromium for Karma's `ChromeHeadless` test runner.

Angular package versions are pinned to the Angular 21 major line in `package.json`. Before installing, check the current Angular compatibility table if using a different Node.js release.

## Installation and running

```bash
npm install
npm start
```

Open the local URL printed by Angular CLI (normally `http://localhost:4200`).

Production build:

```bash
npm run build
```

Run unit tests with Karma and Jasmine:

```bash
npm test
```

Run tests with coverage output:

```bash
npm run test:coverage
```

The coverage report is written to `coverage/wumpus-hunt/`. A 100% coverage target is configured as a project goal; run the suite and review the report before treating that target as verified. If Chrome is not detected, install Chrome/Chromium and configure `CHROME_BIN` to its executable path.

## Rules

- Configure board size, pit count and arrow count on `/`.
- The board is `N × N`. Coordinates are zero-based: the hunter starts at `(N - 1, 0)` facing north; the exit is `(0, N - 1)`.
- The Wumpus, gold and pits are placed randomly. They never overlap one another, the hunter's starting cell, or the exit.
- Move forward, turn left/right by 90 degrees, or shoot an arrow in the direction you face. An arrow travels in a straight line until it hits the Wumpus or the wall. Every shot consumes one arrow; a miss hits the wall.
- Moving into a pit or a living Wumpus kills the hunter. A terminal state disables movement and shooting.
- A breeze indicates an orthogonally adjacent pit; a smell indicates an orthogonally adjacent living Wumpus; glitter indicates gold in the current cell. A wall collision causes a bump. Killing the Wumpus produces a scream.
- Collect the gold, return to the exit cell and select “Exit with gold” to win. Trying to exit without gold or from another cell does not win.
- “Start another game” creates a fresh board with the same parameters.
- Explored cells are lighter grey than unexplored cells. The Wumpus and pits are revealed at the fatal cell after death; the gold is shown at the hunter when collected.

## Architecture

```text
src/
  app/
    core/
      game.types.ts
      services/
        board-generator/
          board-generator.service.ts
          board-generator.service.spec.ts
        game-engine/
          game-engine.service.ts
          game-engine.service.spec.ts
    shared/components/
      button/
      input/
      card/
      status-label/
      board-cell/
    features/
      game/
        components/
          board/
          status-card/
          controls-card/
        game.component.{ts,html,scss}
        game.component.spec.ts
        game.facade.ts
        game.facade.spec.ts
      game-setup/
        setup-page.component.{ts,html,scss}
        setup-page.component.spec.ts
    app.component.ts
    app.routes.ts
```

- **Board generator:** validates configuration and generates non-overlapping entity positions.
- **Game engine:** owns game rules and state transitions, separate from rendering.
- **Game facade:** exposes the game state and terminal-state flag using Angular signals and connects the engine to UI actions.
- **Feature components:** render the board, status and controls.
- **Setup page:** uses Angular Reactive Forms and passes the configuration to `/game` through router navigation state.
- **Shared components:** reusable controls and presentation elements.

## Accessibility notes

- Semantic headings, form labels, native buttons and visible keyboard focus.
- Invalid fields expose `aria-invalid`; validation messages are associated with their input.
- The system message is a polite live region (`role="status"`, `aria-live="polite"`).
- Board cells have accessible names, and the legend labels the visual symbols.
- Do not rely on cell color alone: the hunter, pit, Wumpus, gold and exit also have text symbols/labels.

## Notes

- No backend, database, external API or account is used; all game state is in the browser.
- The game is intentionally minimal and contains no marketing copy beyond “Wumpus Hunt” in the header and footer.
- `BoardGeneratorService.generate` accepts an injectable random function argument for deterministic tests.
- Tests use Karma + Jasmine as requested. Chrome/Chromium must be available to run them in headless mode.
- The implementation targets the Angular 21 major line. Exact latest patch versions can change; run `npm outdated` and consult Angular's official version compatibility table before upgrading.
