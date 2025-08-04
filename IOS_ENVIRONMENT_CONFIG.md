# iOS Environment-Based Configuration

This document explains how the iOS environment-based configuration system works, similar to what was implemented for Android.

## Overview

The iOS configuration system automatically reads environment variables from the config files and updates the iOS build configuration accordingly. This ensures that app names and bundle identifiers are consistent across environments and can be easily managed from the config files.

## How It Works

### 1. Environment Configuration Files

The system reads from the following config files:

- `config/env.dev` - Development environment
- `config/env.staging` - Staging environment
- `config/env.production` - Production environment

### 2. Configuration Script

The `scripts/ios-env-config.js` script:

- Reads environment variables from config files
- Updates Info.plist files with the correct app names
- Updates Xcode project bundle identifiers
- Handles all three flavors (dev, staging, production)

### 3. Automatic Integration

The iOS build scripts automatically run the configuration update before building:

- `yarn ios:dev` - Updates config and builds dev
- `yarn ios:staging` - Updates config and builds staging
- `yarn ios:prod` - Updates config and builds production

## Current Configuration

### Development (`config/env.dev`)

- **APP_NAME**: `SmartPlatform-dev`
- **APP_BUNDLE_ID**: `com.baseSetup`
- **API_URL**: `https://dev-api.smartplatform.com`

### Staging (`config/env.staging`)

- **APP_NAME**: `SmartPlatform-Staging`
- **APP_BUNDLE_ID**: `com.baseSetup.staging`
- **API_URL**: `https://staging-api.smartplatform.com`

### Production (`config/env.production`)

- **APP_NAME**: `SmartPlatform`
- **APP_BUNDLE_ID**: `com.baseSetup`
- **API_URL**: `https://api.smartplatform.com`

## Files Updated

### Info.plist Files

- `ios/smartPlatformRN-dev-Info.plist`
- `ios/smartPlatformRN-staging-Info.plist`
- `ios/smartPlatformRN-production-Info.plist`

### Xcode Project

- `ios/smartPlatformRN.xcodeproj/project.pbxproj`

## Usage

### Manual Configuration Update

```bash
yarn ios:update-config
```

### Building with Auto-Configuration

```bash
# Development
yarn ios:dev

# Staging
yarn ios:staging

# Production
yarn ios:prod
```

## Benefits

✅ **Consistent Configuration**: App names and bundle IDs are managed in one place  
✅ **Environment-Specific**: Each environment has its own configuration  
✅ **Automated**: No manual updates needed - runs automatically before builds  
✅ **Flexible**: Easy to change app names by updating config files  
✅ **Cross-Platform**: Same approach as Android for consistency

## Notes

- The configuration script runs automatically before each iOS build
- Changes to config files are reflected immediately on the next build
- Both dev and production use the same bundle ID (`com.baseSetup`) as requested
- Staging uses a different bundle ID (`com.baseSetup.staging`) to avoid conflicts

## Troubleshooting

If you encounter issues:

1. **Clean the project**: `cd ios && rm -rf build && cd ..`
2. **Reinstall pods**: `cd ios && pod install && cd ..`
3. **Run config update manually**: `yarn ios:update-config`
4. **Rebuild**: `yarn ios:dev` (or staging/prod)

## Script Details

The `scripts/ios-env-config.js` script:

- Reads environment files using Node.js fs module
- Updates Info.plist files using regex replacement
- Updates Xcode project using regex patterns
- Provides detailed logging of all changes
- Handles errors gracefully with fallbacks
