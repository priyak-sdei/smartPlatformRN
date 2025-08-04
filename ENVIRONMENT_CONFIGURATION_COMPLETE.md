# Complete Environment-Based Configuration System

This document explains the complete environment-based configuration system implemented for both Android and iOS platforms in the SmartPlatform React Native app.

## 🎯 Overview

The system automatically reads environment variables from config files and updates both Android and iOS build configurations accordingly. This ensures that app names, bundle identifiers, and other environment-specific settings are consistent across platforms and can be easily managed from centralized config files.

## 📁 Configuration Files

The system uses the following environment configuration files:

- `config/env.dev` - Development environment
- `config/env.staging` - Staging environment
- `config/env.production` - Production environment

### Example Configuration Structure:

```bash
# Development Environment Configuration
ENV=development
API_URL=https://dev-api.smartplatform.com
APP_NAME=SmartPlatform-dev
APP_BUNDLE_ID=com.baseSetup
LOG_LEVEL=debug
ENABLE_LOGGING=true
ENABLE_ANALYTICS=false
```

## 🔧 How It Works

### 1. Android Configuration (`android/app/build.gradle`)

The Android build configuration includes a helper function that reads environment variables from config files:

```gradle
// Helper function to read environment variables from config files
def getEnvVar(String flavor, String key, String fallback) {
    def envFile = file("../../config/env.${flavor}")
    if (envFile.exists()) {
        def properties = new Properties()
        envFile.withInputStream { stream ->
            properties.load(stream)
        }
        def value = properties.getProperty(key)
        return value ? value.trim() : fallback
    }
    return fallback
}
```

**Product Flavors Configuration:**

- **Dev**: Uses `com.baseSetup` bundle ID and `SmartPlatform-dev` app name
- **Staging**: Uses `com.baseSetup.staging` bundle ID and `SmartPlatform-Staging` app name
- **Production**: Uses `com.baseSetup` bundle ID and `SmartPlatform` app name

### 2. iOS Configuration (`scripts/ios-env-config.js`)

The iOS configuration script performs the following operations:

1. **Reads Environment Variables**: Parses config files for each flavor
2. **Updates Info.plist Files**: Updates app names and bundle identifiers
3. **Updates Xcode Project**: Modifies bundle identifiers in the project file
4. **Copies Environment to .env**: Creates `.env` file for `react-native-config`
5. **Cleans Build Directory**: Removes old build artifacts
6. **Regenerates Pods**: Runs `pod install` to regenerate native code

### 3. React Native Config Integration

The system integrates with `react-native-config` by:

- Copying the appropriate environment file to `.env` before each build
- Regenerating native code to ensure environment variables are available in the app
- Supporting both `react-native-config` and `react-native-dotenv` for maximum compatibility

## 🚀 Usage

### Build Commands

**Android:**

```bash
yarn android:dev      # Development build
yarn android:staging  # Staging build
yarn android:prod     # Production build
```

**iOS:**

```bash
yarn ios:dev          # Development build
yarn ios:staging      # Staging build
yarn ios:prod         # Production build
```

### Manual Configuration Update

To manually update configurations:

```bash
# Update iOS configuration
yarn ios:update-config

# Update Android configuration (automatic during build)
yarn android:dev
```

## 🔄 Build Process Flow

### iOS Build Process:

1. **Pre-build**: `ios:update-config` script runs
2. **Environment Detection**: Determines current flavor from `ENVFILE`
3. **Configuration Update**: Updates Info.plist and Xcode project
4. **Environment Copy**: Copies config to `.env` for `react-native-config`
5. **Clean & Rebuild**: Cleans build directory and regenerates pods
6. **Build**: Runs the actual iOS build with updated configuration

### Android Build Process:

1. **Pre-build**: Gradle reads environment variables from config files
2. **Configuration Application**: Applies environment variables to build config
3. **Build**: Runs the actual Android build with updated configuration

## 📱 Current Configuration

### Development Environment:

- **App Name**: `SmartPlatform-dev`
- **Bundle ID**: `com.baseSetup`
- **API URL**: `https://dev-api.smartplatform.com`
- **Log Level**: `debug`

### Staging Environment:

- **App Name**: `SmartPlatform-Staging`
- **Bundle ID**: `com.baseSetup.staging`
- **API URL**: `https://staging-api.smartplatform.com`
- **Log Level**: `info`

### Production Environment:

- **App Name**: `SmartPlatform`
- **Bundle ID**: `com.baseSetup`
- **API URL**: `https://api.smartplatform.com`
- **Log Level**: `error`

## 🛠️ Troubleshooting

### Common Issues:

1. **Environment Variables Not Detected**:

   - Ensure `.env` file is created before build
   - Run `yarn ios:update-config` to regenerate
   - Clean build directory: `rm -rf ios/build`

2. **App Name Not Updated**:

   - Check Info.plist files are updated
   - Verify Xcode project configuration
   - Clean and rebuild the project

3. **Bundle ID Issues**:
   - Verify config files have correct `APP_BUNDLE_ID`
   - Check Xcode project settings
   - Ensure no conflicts with existing apps

### Debug Commands:

```bash
# Check current .env file
cat .env

# Check iOS configuration
node scripts/ios-env-config.js

# Clean iOS build
rm -rf ios/build && cd ios && pod install

# Clean Android build
cd android && ./gradlew clean
```

## ✅ Verification

To verify the configuration is working correctly:

1. **Check App Names**: Each flavor should display the correct app name
2. **Check Bundle IDs**: Verify bundle identifiers match config files
3. **Check Environment Variables**: App should detect correct environment
4. **Check API URLs**: Verify API endpoints match environment

## 🔄 Maintenance

### Adding New Environment Variables:

1. Add variable to all config files (`config/env.*`)
2. Update Android `build.gradle` if needed for native access
3. Update iOS script if needed for native access
4. Test builds for all environments

### Updating App Names:

1. Modify `APP_NAME` in config files
2. Run build commands to apply changes
3. Verify app names are updated correctly

### Updating Bundle IDs:

1. Modify `APP_BUNDLE_ID` in config files
2. Run build commands to apply changes
3. Verify bundle identifiers are updated correctly

## 📋 Summary

This environment-based configuration system provides:

- ✅ **Centralized Configuration**: All environment settings in config files
- ✅ **Cross-Platform Consistency**: Same approach for Android and iOS
- ✅ **Automatic Updates**: Configuration updates run automatically before builds
- ✅ **Easy Maintenance**: Simple config file changes update both platforms
- ✅ **React Native Integration**: Works with `react-native-config` and `react-native-dotenv`
- ✅ **Build Automation**: No manual configuration steps required

The system ensures that app names, bundle identifiers, and environment variables are consistently applied across all build flavors and platforms.
