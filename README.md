# Delivery Order Price Calculator UI (DOPC)

The Delivery Order Price Calculator (**DOPC**) enables users to calculate delivery costs by considering predefined parameters, such as user **coordinates**, **cart value**, and dynamic venue-related data. This data includes delivery pricing and the distance between the user and the venue, fetched from an API. This project serves as a frontend implementation for a [Wolt's 2025 Engineering preliminary](https://github.com/woltapp/frontend-internship-2025?tab=readme-ov-file#delivery-order-price-calculator-ui-dopc).

## Technologies used

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/material-ui/)
- [Vitest](https://vitest.dev/)
- [Testing library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [JSDOM](https://www.npmjs.com/package/jsdom)

## Installation & usage

Please run all the following commands from listed here in the root folder of the project. It's called `dopc_2025_frontend_jerry_uusitalo` in this case.

1.  Install node modules.

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Navigate to [http://localhost:5173](http://localhost:5173) on your browser.

## Unit test scripts

This project Vitest as a test runner to run unit tests. You an run the unit tests using following commands.

Run unit tests and E2E tests sequentially.

```bash
npm run test
```

Launch Vitest in [Watch Mode](https://vitest.dev/guide/features.html#watch-mode)

```bash
npm run test:unit
```

Runs unit tests and displays testing [coverage](https://vitest.dev/guide/coverage)

```bash
npm run test:coverage
```

## E2E test scripts

This project uses Playwright to run E2E tests. Use following commands to run E2E tests straight on the CLI or in [UI-mode](https://playwright.dev/docs/test-ui-mode).

Run e2e tests

```bash
npm run test:e2e
```

Open Playwright in [UI-mode](https://playwright.dev/docs/test-ui-mode)

```bash
npm run test:e2e:ui
```


## Project structure

```
dopc_2025_frontend_jerry_uusitalo/
├── src/                  # Source code
│   ├── components/       # React components
│   ├── utils/            # Main library, utility functions and types
├── __tests__/            # Test files
│   └── e2e.tsx           # Playwright test files
│   └── render.tsx        # Component rendering unit tests
│   └── unit.tsx          # Function logic unit tests
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── playwright.config.ts  # Playwright configuration
└── README.md             # General project documentation
```