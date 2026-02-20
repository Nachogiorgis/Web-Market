# Web–Market

A modern search-engine, platform, marketplace, and network built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**:
  - TanStack Query (React Query) for server state
  - Zustand for client state
- **Forms**: react-hook-form + Zod validation
- **Testing**: Vitest
- **Code Quality**: ESLint + Prettier + Husky

## 📁 Project Structure

```
Web–Market/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── providers.tsx      # App providers (React Query, etc.)
├── lib/                   # Utilities and helpers
│   ├── utils.ts          # Utility functions
│   ├── store/            # Zustand stores
│   ├── hooks/            # Custom React hooks
│   └── validations/      # Zod schemas
├── types/                # TypeScript type definitions
└── public/              # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## 🧪 Testing

Tests are set up with Vitest. Create test files with `.test.ts` or `.test.tsx` extension.

## 🎨 Styling

This project uses Tailwind CSS. Configure your theme in `tailwind.config.ts`.

## 📦 Desktop App (Electron)

The project is structured to be Electron-ready. When you're ready to add Electron support, you can:

1. Install Electron dependencies
2. Create an `electron/` directory
3. Configure Electron build process

## 🔧 Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **Prettier**: Code formatting with Tailwind plugin
- **Husky**: Pre-commit hooks for linting and formatting

## 📝 License

MIT
