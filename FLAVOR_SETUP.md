# App Flavors Setup

This project supports three app flavors: **Development**, **Staging**, and **Production**. Each flavor has unique configurations, app icons, splash screens, and environment variables.

## Flavors Overview

| Flavor      | Bundle ID               | App Name              | Color Theme | Environment |
| ----------- | ----------------------- | --------------------- | ----------- | ----------- |
| Development | `com.baseSetup.dev`     | SmartPlatform Dev     | Green       | Development |
| Staging     | `com.baseSetup.staging` | SmartPlatform Staging | Orange      | Staging     |
| Production  | `com.baseSetup`         | SmartPlatform         | Blue        | Production  |

## Quick Start

### Development Flavor

```bash
# Start Metro bundler for development
yarn start:dev

# Run on Android
yarn android:dev

# Run on iOS
yarn ios:dev
```

### Staging Flavor

```bash
# Start Metro bundler for staging
yarn start:staging

# Run on Android
yarn android:staging

# Run on iOS
yarn ios:staging
```

### Production Flavor

```bash
# Start Metro bundler for production
yarn start:prod

# Run on Android
yarn android:prod

# Run on iOS
yarn ios:prod
```

## Build Commands

### Android APK Builds

```bash
# Development APK
yarn build:android:dev

# Staging APK
yarn build:android:staging

# Production APK
yarn build:android:prod
```

### iOS Archive Builds

```bash
# Development Archive
yarn build:ios:dev

# Staging Archive
yarn build:ios:staging

# Production Archive
yarn build:ios:prod
```

## Environment Configuration

Environment variables are stored in the `config/` directory:

- `config/env.dev` - Development environment
- `config/env.staging` - Staging environment
- `config/env.production` - Production environment

### Available Environment Variables

| Variable           | Description            | Default                             |
| ------------------ | ---------------------- | ----------------------------------- |
| `ENV`              | Environment name       | `development`                       |
| `API_URL`          | API endpoint URL       | `https://dev-api.smartplatform.com` |
| `APP_NAME`         | App display name       | `SmartPlatform Dev`                 |
| `APP_BUNDLE_ID`    | Bundle identifier      | `com.baseSetup.dev`                 |
| `LOG_LEVEL`        | Logging level          | `debug`                             |
| `ENABLE_LOGGING`   | Enable console logging | `true`                              |
| `ENABLE_ANALYTICS` | Enable analytics       | `false`                             |

## Using Configuration in Code

```typescript
import appConfig, {
  isDevelopment,
  isStaging,
  isProduction,
  getApiUrl,
  shouldEnableLogging,
} from './src/config';

// Check environment
if (isDevelopment) {
  console.log('Running in development mode');
}

// Get API URL
const apiUrl = getApiUrl();

// Check if logging is enabled
if (shouldEnableLogging()) {
  console.log('Debug info:', appConfig);
}
```

## Android Configuration

### Product Flavors

The Android build is configured with three product flavors in `android/app/build.gradle`:

- `dev` - Development flavor
- `staging` - Staging flavor
- `production` - Production flavor

### Flavor-Specific Resources

Each flavor can have its own resources in:

```
android/app/src/{flavor}/res/
├── mipmap-hdpi/
├── mipmap-mdpi/
├── mipmap-xhdpi/
├── mipmap-xxhdpi/
└── mipmap-xxxhdpi/
```

### App Icons

Place different colored app icons for each flavor:

- **Development**: Green theme (`#4CAF50`)
- **Staging**: Orange theme (`#FF9800`)
- **Production**: Blue theme (`#2196F3`)

### Splash Screens

Splash screen resources are in:

```
android/app/src/{flavor}/res/drawable*/
└── bootsplash_logo.png
```

## iOS Configuration

### Setup Instructions

1. Open `ios/smartPlatformRN.xcworkspace` in Xcode
2. Create new targets for each flavor:
   - `smartPlatformRN-dev`
   - `smartPlatformRN-staging`
   - `smartPlatformRN-production`
3. Configure bundle identifiers and display names
4. Create schemes for each target
5. Configure Info.plist for each target

### Flavor-Specific Resources

Each flavor can have its own resources in:

```
ios/smartPlatformRN/{flavor}/
├── BootSplash.storyboard
└── Info.plist
```

### App Icons

Configure different app icons for each flavor in Xcode:

- **Development**: Green theme
- **Staging**: Orange theme
- **Production**: Blue theme

## Customization

### Adding New Environment Variables

1. Add the variable to all environment files in `config/`
2. Update the `AppConfig` interface in `src/config/index.ts`
3. Add the variable to the `appConfig` object

### Changing Flavor Colors

1. Update the color values in the generation scripts
2. Regenerate the flavor directories
3. Create new icon and splash screen assets

### Adding New Flavors

1. Add the flavor to `android/app/build.gradle`
2. Create environment file in `config/`
3. Add build scripts to `package.json`
4. Set up iOS target and scheme
5. Create flavor-specific resources

## Troubleshooting

### Common Issues

**Build fails with flavor not found**

- Ensure the flavor name matches exactly in build.gradle and package.json
- Clean and rebuild: `cd android && ./gradlew clean`

**Environment variables not loading**

- Check that the ENVFILE path is correct in package.json scripts
- Verify the environment file exists in the config directory

**iOS scheme not found**

- Ensure the scheme name matches exactly in Xcode
- Check that the scheme is shared and visible

**App icons not updating**

- Clean the build: `cd android && ./gradlew clean`
- For iOS: `rm -rf ios/build && cd ios && pod install`

### Clean Build Commands

```bash
# Android
cd android && ./gradlew clean

# iOS
rm -rf ios/build
cd ios && pod install --repo-update

# Metro cache
yarn start --reset-cache
```

## Notes

- Environment files in `config/` are versioned (not ignored by git)
- Each flavor can be installed simultaneously on the same device
- Production builds use release signing configuration
- Development and staging builds use debug signing configuration
