# Finzep - Digital Payments & Collection System

A modern React application for Finzep's digital payment solutions, featuring beautiful UI with orange and blue gradients.

## Features

- **Home Page**: Showcases Finzep's flagship solutions with animated components
- **About Us**: Company information and team details
- **UPI Payouts**: Dedicated page for UPI payment solutions
- **Login Page**: Beautiful gradient-styled authentication with social login options
- **Signup Page**: Complete registration form with glassmorphism design
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Design System

The application uses a consistent color scheme:

- **Primary Orange**: `#F18A41`
- **Primary Blue**: `#9DADE5`
- **Dark Text**: `#233831`
- **Gradient Backgrounds**: Orange to blue gradients throughout the app

## Pages

### Authentication Pages

- **Login** (`/login`): Features animated gradient background, glassmorphism form design, and social login options
- **Signup** (`/signup`): Complete registration form with first name, last name, email, phone, password fields, and terms agreement

### Main Pages

- **Home** (`/`): Landing page with services carousel, statistics, and company overview
- **About Us** (`/aboutus`): Company information, team members, and mission
- **UPI Payouts** (`/upiPayouts`): Dedicated UPI payment solutions page

## Technologies Used

- **React 18** with Vite for fast development
- **Framer Motion** for smooth animations
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **GSAP** for advanced animations

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the displayed URL

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login page with gradient design
│   ├── Signup.jsx      # Signup page with glassmorphism
│   ├── AboutUs.jsx     # About page
│   └── UPIPayouts.jsx  # UPI solutions page
├── App.jsx             # Main app with routing
└── main.jsx           # Entry point
```

## Design Features

- **Glassmorphism Effects**: Semi-transparent backgrounds with backdrop blur
- **Animated Gradients**: Smooth gradient animations on authentication pages
- **Responsive Forms**: Mobile-friendly input fields with proper validation
- **Social Login**: Google and Twitter integration options
- **Smooth Transitions**: Framer Motion animations throughout the app
