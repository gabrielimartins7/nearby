# Nearby 📍

> A mobile-first marketplace discovery application connecting users with local businesses through location-based services and QR code integrations.

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Expo](https://img.shields.io/badge/expo-54.0.20-black.svg)
![React Native](https://img.shields.io/badge/react--native-0.81.5-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

</div>

---

## 📋 Overview

**Nearby** is a modern React Native application built with Expo that enables users to discover nearby marketplaces and local businesses. The app leverages geolocation services, interactive maps, and QR code scanning to provide a seamless shopping discovery experience.

### Key Features

- 🗺️ **Interactive Map Integration** - Real-time marketplace discovery using React Native Maps
- 📍 **Location Services** - Precise geolocation tracking with Expo Location
- 🏪 **Category Filtering** - Browse businesses by category with dynamic filtering
- 📱 **QR Code Scanner** - Scan coupons with integrated camera functionality
- 🎟️ **Coupon Management** - Redemption system for exclusive offers
- 🎨 **Responsive UI** - Adaptive design for all screen sizes
- ⚡ **Real-time API Integration** - Live data synchronization with backend services

---

## 🚀 Technology Stack

### Frontend Framework
- **React** `19.1.0` - UI library
- **React Native** `0.81.5` - Cross-platform mobile framework
- **Expo** `54.0.20` - Managed React Native development platform

### Navigation & Routing
- **Expo Router** `6.0.13` - File-based routing system
- **React Navigation** `7.1.8` - Navigation infrastructure

### UI Components & Animations
- **@gorhom/bottom-sheet** `5.2.8` - Bottom sheet modal component
- **React Native Reanimated** `4.1.1` - Gesture and animation library
- **Tabler Icons** `3.35.0` - Icon library
- **Expo Vector Icons** `15.0.3` - Icon support

### Location & Camera
- **Expo Location** `19.0.8` - Geolocation services
- **Expo Camera** `17.0.10` - Camera access and QR scanning
- **React Native Maps** `1.20.1` - Interactive mapping

### Data & API
- **Axios** `1.13.1` - HTTP client
- **Expo Constants** `18.0.10` - Environment configuration

### Development Tools
- **TypeScript** `5.9.2` - Static typing
- **@types/react** `19.1.0` - React type definitions

---

## 📁 Project Structure

```
nearby/
├── src/
│   ├── app/                          # Application screens & routing
│   │   ├── _layout.tsx              # Root layout
│   │   ├── index.tsx                # Welcome screen
│   │   ├── home.tsx                 # Main marketplace discovery
│   │   └── market/
│   │       └── [id].tsx             # Market details & coupon redemption
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── button/                  # Custom button component
│   │   ├── categories/              # Category list display
│   │   ├── category/                # Individual category item
│   │   ├── market/                  # Market-specific components
│   │   │   ├── cover/              # Market header image
│   │   │   ├── details/            # Market information
│   │   │   ├── info/               # Additional details
│   │   │   ├── coupon/             # Coupon display
│   │   │   └── steps/              # Process steps
│   │   ├── places/                 # Places list container
│   │   ├── place/                  # Individual place item
│   │   ├── loading/                # Loading indicator
│   │   ├── welcome/                # Welcome screen content
│   │   └── steps/                  # Onboarding steps
│   │
│   ├── services/
│   │   └── api.ts                   # Axios API configuration
│   │
│   ├── styles/
│   │   ├── colors.ts               # Color palette
│   │   ├── font-family.ts          # Typography
│   │   └── theme.ts                # Theme configuration
│   │
│   └── utils/
│       └── categories-icons.ts      # Category icon mapping
│
├── assets/                           # Static assets
│   └── images/                       # Application images
│
├── app.json                          # Expo configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── expo-env.d.ts                     # Environment types

```

---

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** `>=18.0.0`
- **npm** or **yarn**
- **Expo CLI** (optional but recommended)

### Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd nearby

# Install dependencies
npm install
# or
yarn install
```

### Environment Configuration

Update the API base URL in [src/services/api.ts](src/services/api.ts):

```typescript
export const api = axios.create({
    baseURL: "YOUR_API_ENDPOINT", // Replace with your backend URL
    timeout: 7000,
})
```

---

## 🏃 Running the Application

### Development Server

```bash
# Start Expo development server
npm run start

# Alternative
expo start
```

### Platform-Specific Commands

```bash
# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

### Using Expo Go

1. Install [Expo Go](https://expo.dev/go) on your mobile device
2. Scan the QR code displayed in terminal
3. App loads in Expo Go

---

## 📱 Key Features Implementation

### Location-Based Discovery
The app uses Expo Location to track user position and display nearby marketplaces on an interactive map with custom markers.

### QR Code Scanning
Integrated camera functionality allows users to scan QR codes for coupon redemption. The app handles camera permissions and displays real-time scanning feedback.

### Category Filtering
Users can filter marketplaces by categories with dynamic icon mapping and real-time state management.

### Coupon System
Secure coupon redemption with API integration, featuring:
- QR code scanning for validation
- Redemption tracking
- Alert notifications for status feedback

---

## 🎨 Design System

The application follows a clean, modern design system with:

- **Color Palette**: Green accent (`#257F49`), supporting dark/light mode
- **Typography**: Rubik font family via Expo Google Fonts
- **Layout**: Responsive design adapting to all screen sizes
- **Accessibility**: Full support for both portrait and landscape orientations

---

## 🔌 API Integration

The application communicates with a backend API for:

- **GET /categories** - Fetch all marketplace categories
- **GET /markets** - Retrieve marketplace listings
- **GET /markets/:id** - Fetch specific marketplace details
- **PATCH /coupons/:id** - Redeem coupons

Ensure your backend implements these endpoints with proper authentication if required.

---

## 🛠️ Development Best Practices

### Component Structure
- Components are organized by feature with colocation of styles
- Shared components in `components/` directory
- Screen components in `app/` following Expo Router conventions

### State Management
- React hooks for local state (`useState`, `useEffect`)
- Ref-based state for non-UI updates (`useRef`)
- Direct API calls via Axios

### Type Safety
- Full TypeScript coverage with strict mode enabled
- Proper typing of component props and API responses
- Path aliases via `@/*` for clean imports

### Performance
- Lazy component loading via Expo Router
- Optimized re-renders with proper dependency arrays
- Camera permission handling and cleanup

---

## 📦 Build & Distribution

### Expo Build (Recommended)

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Manual Build
Refer to [React Native documentation](https://reactnative.dev/docs/native-modules-intro) for platform-specific build instructions.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

## 🐛 Troubleshooting

### Camera Not Working
- Verify camera permissions in app settings
- For iOS: Check `Info.plist` camera usage description
- For Android: Check `AndroidManifest.xml` permissions

### API Connection Issues
- Verify backend service is running
- Check network connectivity
- Ensure correct API endpoint in `api.ts`

### Location Services
- Grant location permissions when prompted
- Ensure location services enabled on device
- Check device GPS functionality

---

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 👨‍💻 Author

Created with ❤️ for location-based commerce.

---

## 📞 Support & Contact

For issues, feature requests, or questions:
- Create an issue in the repository
- Contact the development team

---

<div align="center">

**Built with Expo & React Native** 🚀

Made with passion for modern mobile development

</div>
