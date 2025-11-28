# Chronic Care Master

A mobile-first, offline-capable educational platform for mastering chronic disease management through interactive learning modules, clinical case studies, and evidence-based guidelines.

## Overview

Chronic Care Master is designed to help healthcare professionals and students learn the principles of chronic disease management covering high-yield conditions including:

- **Diabetes Mellitus** (Type 1 & Type 2)
- **Hypertension**
- **Heart Failure** (HFrEF vs HFpEF)
- **Asthma**
- **COPD**
- **Depression & Anxiety**

## Features

### Interactive Disease Modules

Each module emphasizes guideline-based conceptual logic, when to initiate or adjust therapy, monitoring intervals, disease classification frameworks, and recognition of decompensation.

- **Diabetes**: A1c trajectory analysis tool for visualizing glycemic control trends
- **Hypertension**: BP classification tool with stage-based management
- **Heart Failure**: Hemodynamic profile analyzer (warm/cold, wet/dry quadrants)
- **Asthma**: Severity builder with step-up/step-down therapy logic
- **COPD**: GOLD classification system with exacerbation management
- **Mood Disorders**: PHQ-9 and GAD-7 assessment tools

### Clinical Cases

Longitudinal patient scenarios demonstrating:
- Disease progression over multiple visits
- Treatment decision-making
- Monitoring and follow-up strategies
- Recognition of complications

### Assessment

Self-assessment questions with:
- Multiple choice questions across all disease modules
- Detailed rationales for each answer
- Category-based filtering
- **Note**: No score tracking or user data collection

### Additional Features

- **Glossary**: Comprehensive medical terminology reference
- **Settings**: Dark/light mode toggle, about section, and educational disclaimers
- **Mobile-First Design**: Optimized for all device sizes
- **Offline Capability**: Service worker enables offline access
- **Accessibility**: WCAG 2.2 AA compliant

## Technical Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **PWA**: Vite PWA Plugin
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Knowledgesynthesis/CHRONIC-CARE-MASTER.git

# Navigate to project directory
cd CHRONIC-CARE-MASTER

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The development server will start at `http://localhost:5173` (default Vite port).

### Build

Production build outputs to the `dist` directory and includes:
- Optimized and minified JavaScript
- CSS with Tailwind purging
- Service worker for offline functionality
- Web app manifest for PWA installation

## Project Structure

```
CHRONIC-CARE-MASTER/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Layout.tsx
│   │   └── Navigation.tsx
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── Diabetes.tsx
│   │   ├── Hypertension.tsx
│   │   ├── HeartFailure.tsx
│   │   ├── Asthma.tsx
│   │   ├── COPD.tsx
│   │   ├── Mood.tsx
│   │   ├── Cases.tsx
│   │   ├── Assessment.tsx
│   │   ├── Glossary.tsx
│   │   └── Settings.tsx
│   ├── store/          # State management
│   │   └── themeStore.ts
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/          # Utility functions
│   │   └── cn.ts
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Educational Philosophy

This app is built with an educational-first approach:

- **No Clinical Decision-Making**: All content is for educational purposes only
- **No Data Tracking**: No user analytics, progress tracking, or data collection
- **No Medication Dosing**: Focuses on conceptual understanding, not prescribing
- **Synthetic Cases Only**: All clinical scenarios are educational examples
- **Guideline-Aligned**: Based on current evidence-based practices (ADA, ACC/AHA, GOLD, GINA, APA)

## Important Disclaimers

⚠️ **For Educational Purposes Only**

This application is designed solely for educational purposes. It is NOT intended to replace professional medical advice, diagnosis, or treatment.

- All clinical scenarios and data are synthetic
- Not for use in actual patient care or clinical decision-making
- Always consult current clinical guidelines and healthcare professionals
- Medical knowledge evolves - verify information with current sources

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome for Android)
- Progressive Web App (PWA) capabilities

## Contributing

This is an educational project. For questions or suggestions, please open an issue.

## License

Educational use only. Please refer to appropriate licensing for any commercial or clinical use.

## Acknowledgments

Built in accordance with plan.md and ultrathink.md specifications, emphasizing:
- Elegant, intuitive design
- Mobile-first responsive layout
- Offline-capable architecture
- Evidence-based educational content
- Accessibility compliance

---

**Version**: 1.0.0
**Last Updated**: November 2024
**Status**: Production Ready
