# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MITI Admin is a React + TypeScript admin console for the MITI sports matching service. It manages members, games, courts, inquiries, reports, and settlements via a REST API (`https://dev.makeittakeit.kr`).

## Commands

```bash
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Type-check + production build (tsc -b && vite build)
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format
npm run format:check # Prettier check
npm run test         # Vitest (currently minimal test coverage)
```

Pre-ship checklist order: `lint` → `format:check` → fix if needed → `build`.

## Architecture

### Routing & Auth

Routes are defined in `src/main.tsx` using `createBrowserRouter`. All protected routes are children of `PrivateRoute` (`src/pages/PrivateRoute.tsx`), which checks `sessionStorage.getItem("accessToken")` and redirects to `/login` if absent.

Auth state is managed by Zustand in `src/store/useUserStore.ts` with `persist` middleware (stored under key `"user-store"`). The access token lives in `sessionStorage`, not Zustand.

### API Layer

`src/utils/axios.ts` creates a singleton Axios instance pointed at the dev API. Its request interceptor injects `Authorization: Bearer <token>` from `sessionStorage`. All feature API calls use this instance.

Top-level `src/api/` contains thin API wrappers for auth, users, reports, and payments. Feature-specific API calls live in `src/features/<domain>/api/`.

### Feature Module Structure

Each domain follows this structure (courts is the most complete example):

```
src/features/<domain>/
  api/          # Raw axios call functions
  components/   # Domain UI components (not pages)
  hooks/
    query/      # useQuery / useInfiniteQuery wrappers
    mutation/   # useMutation wrappers
    use<Domain>Page.tsx   # Page-level logic hook (composes queries + local state)
  interface/    # TypeScript interfaces for API shapes
  constants/    # Domain-specific constants
  mocks/        # MSW handlers (sparse, mostly unused)
```

**Page-level hooks** (e.g., `useGameDetailsPage`, `useCourtsPage`) own all logic for their page: reading `useSearchParams`, composing query/mutation hooks, managing local UI state, and exposing handlers. Pages are thin — they call the page hook and pass data to feature components.

**Query hooks** wrap `useQuery` or `useInfiniteQuery` with a typed `queryKey`. Infinite queries use cursor-based pagination (`has_more` + `page_last_cursor` from the API response).

**Mutation hooks** wrap `useMutation`, call `queryClient.invalidateQueries` on success, and show `toast.success` / `toast.error` via react-toastify.

### Shared Components

`src/components/common/` contains layout primitives: `Navbar`, `TableLayout`, `SearchField`, `Spinner`, and pagination components. These are used across all pages.

`src/lib/utils.ts` exports `cn()` — a `twMerge`-based class name helper. Use this for conditional Tailwind classes.

### Styling

Tailwind CSS with CSS variable-based theming (HSL custom properties in `src/index.css`). The `tailwind.config.js` maps semantic color tokens (`primary`, `secondary`, `card`, `sidebar`, etc.) to these variables. Always use semantic tokens over raw colors.

### Global State

Only auth state lives in Zustand (`useUserStore`). All server state is managed by TanStack Query. Avoid adding new Zustand stores unless the state is truly client-side and not server-derived.

## Key Conventions

- **Pagination**: List pages use cursor-based infinite scroll via `useInfiniteQuery`. The cursor (`page_last_cursor`) is passed as `pageParam`.
- **Tabs on detail pages**: Tab state lives in `useSearchParams` (e.g., `?tab=participants`), not component state.
- **Toasts**: Use `react-toastify` for mutation feedback. Toast config is set globally in `main.tsx` (`position: "top-center"`, `autoClose: 2500`, `theme: "dark"`).
- **Path alias**: `@` resolves to `src/` (configured in `vite.config.ts`).
- **Prettier**: double quotes, semicolons, trailing commas, `printWidth: 100`.
- **Testing**: Vitest + Testing Library is configured but tests are minimal. The `vite.config.ts` test block is commented out; enable it before writing tests.
