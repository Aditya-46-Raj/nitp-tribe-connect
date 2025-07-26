# NITP Tribe Connect - UI Only Version

This is a UI-only version of the NITP Tribe Connect application with all database connections removed. The application now uses mock data for demonstration purposes.

## Changes Made

### Database Removal
- ✅ Removed `@supabase/supabase-js` dependency from package.json
- ✅ Removed `src/integrations/supabase/` folder and all Supabase integration files
- ✅ Removed `supabase/` configuration folder
- ✅ Updated AuthContext to use mock data instead of Supabase authentication

### Mock Data Implementation
- The application now uses mock user and profile data
- Authentication functions (signIn, signUp, signOut) are simulated
- Profile updates work with local state only
- No network requests are made

## Setup Instructions

Since you don't have Node.js/npm installed, you'll need to install a JavaScript runtime first:

### Option 1: Install Node.js
1. Download Node.js from https://nodejs.org/
2. Install Node.js (which includes npm)
3. Restart your terminal/command prompt
4. Navigate to the project directory
5. Run: `npm install`
6. Run: `npm run dev`

### Option 2: Install Bun (Faster alternative)
1. Download Bun from https://bun.sh/
2. Install Bun
3. Navigate to the project directory
4. Run: `bun install`
5. Run: `bun run dev`

## Project Structure

The application is now a pure React + TypeScript + Vite frontend with:
- **Authentication**: Mock authentication system (no real login required)
- **Profile Management**: Local state management for user profiles
- **UI Components**: Full shadcn/ui component library
- **Styling**: Tailwind CSS for styling
- **Routing**: React Router for navigation

## Mock User Data

The application automatically logs you in as:
- **Name**: John Doe
- **Email**: john.doe@example.com
- **Role**: User
- **Batch**: 2024

You can modify profile information, and it will be stored in local component state.

## Development

Once you have Node.js or Bun installed:

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## Available Pages

- **Home** (`/`) - Main dashboard
- **Profile** (`/profile`) - User profile management
- **Auth** (`/auth`) - Authentication page (now just for UI demo)
- **Admin** (`/admin`) - Admin panel
- **Post Editor** (`/post/new`) - Create new posts
- **Opportunities** (`/opportunities`) - Job/internship opportunities
- **Leaderboard** (`/leaderboard`) - User rankings
- **Community** (`/community`) - Community features

All pages are fully functional for UI demonstration without requiring database connections.
