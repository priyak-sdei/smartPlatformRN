#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to read environment variables from config files
function readEnvConfig(flavor) {
  const envFile = path.join(__dirname, '..', 'config', `env.${flavor}`);
  const envConfig = {};
  
  if (fs.existsSync(envFile)) {
    const content = fs.readFileSync(envFile, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, value] = trimmedLine.split('=');
        if (key && value) {
          envConfig[key.trim()] = value.trim();
        }
      }
    });
  }
  
  return envConfig;
}

// Function to update Info.plist files
function updateInfoPlist(flavor, envConfig) {
  const infoPlistPath = path.join(__dirname, '..', 'ios', `smartPlatformRN-${flavor}-Info.plist`);
  
  if (fs.existsSync(infoPlistPath)) {
    let content = fs.readFileSync(infoPlistPath, 'utf8');
    
    // Update CFBundleDisplayName
    const appName = envConfig.APP_NAME || 'SmartPlatform';
    content = content.replace(
      /<key>CFBundleDisplayName<\/key>\s*<string>.*?<\/string>/,
      `<key>CFBundleDisplayName</key>\n\t<string>${appName}</string>`
    );
    
    fs.writeFileSync(infoPlistPath, content);
    console.log(`✅ Updated ${flavor} Info.plist with APP_NAME: ${appName}`);
  } else {
    console.log(`⚠️  Info.plist not found for ${flavor}: ${infoPlistPath}`);
  }
}

// Function to copy environment file to .env for react-native-config
function copyEnvFile(flavor, envConfig) {
  const sourceFile = path.join(__dirname, '..', 'config', `env.${flavor}`);
  const targetFile = path.join(__dirname, '..', '.env');
  
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`✅ Copied ${flavor} environment to .env for react-native-config`);
    
    // Clean iOS build to force react-native-config regeneration
    const iosBuildPath = path.join(__dirname, '..', 'ios', 'build');
    if (fs.existsSync(iosBuildPath)) {
      const { execSync } = require('child_process');
      try {
        execSync('rm -rf ios/build', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
        console.log('✅ Cleaned iOS build directory');
      } catch (error) {
        console.log('⚠️  Could not clean iOS build directory:', error.message);
      }
    }
  } else {
    console.log(`⚠️  Environment file not found: ${sourceFile}`);
  }
}

// Function to update Xcode project bundle identifiers
function updateXcodeProject(flavor, envConfig) {
  const projectPath = path.join(__dirname, '..', 'ios', 'smartPlatformRN.xcodeproj', 'project.pbxproj');
  
  if (fs.existsSync(projectPath)) {
    let content = fs.readFileSync(projectPath, 'utf8');
    
    const bundleId = envConfig.APP_BUNDLE_ID || 'com.baseSetup';
    const appName = envConfig.APP_NAME || 'SmartPlatform';
    
    // Update PRODUCT_BUNDLE_IDENTIFIER for the specific flavor
    // Look for the pattern: INFOPLIST_FILE = "smartPlatformRN-{flavor}-Info.plist";
    const flavorPattern = new RegExp(
      `(INFOPLIST_FILE = "smartPlatformRN-${flavor}-Info\\.plist";\\s*INFOPLIST_KEY_CFBundleDisplayName = ).*?;`,
      'g'
    );
    
    if (flavorPattern.test(content)) {
      content = content.replace(flavorPattern, `$1${appName};`);
      console.log(`✅ Updated ${flavor} display name: ${appName}`);
    }
    
    // Update PRODUCT_BUNDLE_IDENTIFIER for the specific flavor
    // Look for the pattern: PRODUCT_BUNDLE_IDENTIFIER = com.baseSetup; (in the context of the flavor)
    const bundleIdPattern = new RegExp(
      `(INFOPLIST_FILE = "smartPlatformRN-${flavor}-Info\\.plist";[\\s\\S]*?PRODUCT_BUNDLE_IDENTIFIER = ).*?;`,
      'g'
    );
    
    if (bundleIdPattern.test(content)) {
      content = content.replace(bundleIdPattern, `$1${bundleId};`);
      console.log(`✅ Updated ${flavor} bundle identifier: ${bundleId}`);
    }
    
    fs.writeFileSync(projectPath, content);
  } else {
    console.log(`⚠️  Xcode project not found: ${projectPath}`);
  }
}

// Main function
function main() {
  const flavors = ['dev', 'staging', 'production'];
  
  console.log('🚀 Updating iOS configuration from environment files...\n');
  
  // Determine which flavor is being built
  const currentFlavor = process.env.ENVFILE?.replace('config/env.', '') || 'dev';
  console.log(`🎯 Building for flavor: ${currentFlavor}`);
  
  flavors.forEach(flavor => {
    console.log(`📱 Processing ${flavor} configuration...`);
    
    const envConfig = readEnvConfig(flavor);
    
    if (Object.keys(envConfig).length > 0) {
      updateInfoPlist(flavor, envConfig);
      updateXcodeProject(flavor, envConfig);
      
      // Copy the current flavor's environment to .env for react-native-config
      if (flavor === currentFlavor) {
        copyEnvFile(flavor, envConfig);
      }
    } else {
      console.log(`⚠️  No environment configuration found for ${flavor}`);
    }
    
    console.log('');
  });
  
      console.log('✅ iOS configuration update complete!');
    console.log('💡 Remember to clean and rebuild your iOS project.');
    
    // Regenerate react-native-config files
    console.log('🔄 Regenerating react-native-config files...');
    const { execSync } = require('child_process');
    try {
      execSync('cd ios && pod install', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
      console.log('✅ React-native-config files regenerated');
    } catch (error) {
      console.log('⚠️  Could not regenerate react-native-config files:', error.message);
    }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { readEnvConfig, updateInfoPlist, updateXcodeProject, copyEnvFile }; 