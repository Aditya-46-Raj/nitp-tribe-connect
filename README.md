# NITP Tribe Connect

NITP Tribe Connect is a community platform designed specifically for students of National Institute of Technology Patna (NITP). This platform helps students connect, share opportunities, collaborate on projects, and build a stronger academic community.

## Features

- **Community Feed**: Share and discover posts from fellow NITP students
- **Opportunity Sharing**: Post and find internships, hackathons, and placement opportunities
- **Project Collaboration**: Connect with students for academic and open-source projects
- **Help & Support**: Get help with assignments and academic queries
- **Profile Management**: Maintain your academic profile and achievements
- **Tag-based Filtering**: Find relevant content using tags like #placement, #internship, #project
- **Real-time Interactions**: Like, comment, and bookmark posts

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

Clone the repository:

```bash
git clone https://github.com/Aditya-46-Raj/nitp-tribe-connect.git
```

Navigate to the project directory:

```bash
cd nitp-tribe-connect
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and visit `http://localhost:5173`

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Authentication**: Mock authentication system (UI-only mode)

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── Navbar.tsx     # Navigation component
│   ├── PostCard.tsx   # Post display component
│   └── ProfileEdit.tsx # Profile editing component
├── contexts/          # React contexts
│   └── AuthContext.tsx # Authentication context
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Main application pages
│   ├── Home.tsx       # Community feed
│   ├── Profile.tsx    # User profile
│   ├── Settings.tsx   # User settings
│   └── ...
└── assets/            # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or suggestions, please reach out to the NITP Tribe Connect team.

---

Built with ❤️ for the NITP community
