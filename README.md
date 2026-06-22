# Currency Converter

[![wakatime](https://wakatime.com/badge/user/95d53339-5d86-4eb8-ad8f-27fb3d2c599d/project/a8d63de4-7f8d-4b54-801a-40e0dbc4cb2e.svg)](https://wakatime.com/badge/user/95d53339-5d86-4eb8-ad8f-27fb3d2c599d/project/a8d63de4-7f8d-4b54-801a-40e0dbc4cb2e)

A lightweight, single-page currency converter built with Vue 3 and the Composition API. Converts between world currencies using real-time exchange rates from CurrencyBeacon.

## Tech Stack

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript 6**
- **Vite 8** (dev server, build, API proxy)
- **ofetch** for HTTP requests
- **VueUse** for utility composables
- **pnpm** as package manager
- **Volta** for pinned Node & pnpm versions

## Architecture Decisions

### No Pinia (no global state)

The app intentionally avoids Pinia or any global store. All state lives inside composables (`useCurrencies`, `useCurrencieConvert`) and is passed down through props. This keeps data flow explicit, components self-contained, and eliminates the overhead of a state management layer for what is fundamentally a single-view tool.

### No Vue Router

There is only one view, so Vue Router would add complexity with no benefit. The entire app renders through `App.vue` -> `CurrencyConverter` without any routing layer.

A potential future enhancement is deep-linking via query parameters (e.g. `?from=USD&to=EUR&amount=100`) to allow sharing or bookmarking specific conversions. This can be implemented with vanilla `URLSearchParams` without needing a router - see [IDEAS.md](IDEAS.md) for details.

### API Proxy

CurrencyBeacon API calls are proxied through Vite's dev server (`/api` -> `api.currencybeacon.com`) and through Vercel rewrites in production. This avoids CORS issues and keeps the API key out of client-side requests.

### Component Structure

Components are organized by domain rather than by type:

```
src/
  components/
    Ui/              # Reusable primitives (UiInput, UiOverlay, UiPopup)
    base/             # App-level layout (Overlay, Popup)
    converter/        # Domain components (AmountInput, CurrencyConverter, ...)
  composables/        # Stateful logic (useCurrencies, useCurrencieConvert, ...)
  services/           # API layer (CurrencyBeacon client + mappers)
  types/              # Shared TypeScript types
```

### Service Layer with Mappers

The CurrencyBeacon API integration is isolated behind a service layer with dedicated mapper functions and types. This decouples the app's internal data model from the external API shape, making it straightforward to swap providers or adapt to API changes without touching component logic.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type-check & build for production
pnpm build

# Skip Type-check & build for production
pnpm build-only

# Preview production build
pnpm preview
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your CurrencyBeacon API key.

## Linting & Formatting

```bash
pnpm format
```

## Lighthouse Scores

**Mobile:**

<img width="719" height="812" alt="Lighthouse mobile score" src="https://github.com/user-attachments/assets/3d7461e0-1dc3-4b0f-b13a-1ebcb0db7679" />

**Desktop:**

<img width="719" height="812" alt="Lighthouse desktop score" src="https://github.com/user-attachments/assets/2f6a51e2-2536-48a0-a65c-c4c67df35a14" />
