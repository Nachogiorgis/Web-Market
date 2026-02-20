# Setup Guide

## Quick Start

1. **Install dependencies** (if not already done):

   ```bash
   npm install
   ```

2. **Run development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure Overview

### `/app`

Next.js App Router directory. Contains:

- `layout.tsx` - Root layout with providers
- `page.tsx` - Home page
- `globals.css` - Global styles

### `/components`

Reusable React components:

- `providers.tsx` - App-level providers (React Query, etc.)
- `ui/` - Base UI components (Button, etc.)
- `example-form.tsx` - Example form component

### `/lib`

Utility functions and helpers:

- `utils.ts` - General utilities (cn function for class merging)
- `store/` - Zustand stores for client state
- `hooks/` - Custom React hooks (using React Query)
- `validations/` - Zod validation schemas

### `/types`

TypeScript type definitions

### `/public`

Static assets (images, fonts, etc.)

## State Management

### Server State (TanStack Query)

Use React Query for data fetching and server state:

```typescript
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["myData"],
    queryFn: fetchMyData,
  });
  // ...
}
```

### Client State (Zustand)

Use Zustand for local/client state:

```typescript
import { useExampleStore } from "@/lib/store/example-store";

function MyComponent() {
  const count = useExampleStore((state) => state.count);
  const increment = useExampleStore((state) => state.increment);
  // ...
}
```

## Forms

Forms use `react-hook-form` with `zod` validation:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mySchema } from "@/lib/validations/my-schema";

function MyForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(mySchema),
  });
  // ...
}
```

## Testing

Tests are written with Vitest:

```bash
npm run test          # Run tests
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage
```

## Code Quality

- **ESLint**: `npm run lint`
- **Prettier**: `npm run format`
- **Pre-commit hooks**: Automatically run lint-staged on commit

## Next Steps

1. Remove example files (`example-form.tsx`, `example-store.ts`, etc.)
2. Set up your API routes in `/app/api`
3. Configure your database/backend connection
4. Start building your features!
