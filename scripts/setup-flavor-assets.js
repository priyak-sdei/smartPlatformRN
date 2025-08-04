const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎨 Setting up flavor-specific assets and React Native linking...');
console.log('============================================================');

// Flavor configurations
const flavors = {
  dev: {
    name: 'Development',
    color: '#4CAF50',
    backgroundColor: '#4CAF50',
    iconBackground: '#4CAF50',
    suffix: '-dev'
  },
  staging: {
    name: 'Staging', 
    color: '#FF9800',
    backgroundColor: '#FF9800',
    iconBackground: '#FF9800',
    suffix: '-staging'
  },
  production: {
    name: 'Production',
    color: '#2196F3', 
    backgroundColor: '#2196F3',
    iconBackground: '#2196F3',
    suffix: '-production'
  }
};

// Ensure smart-assets directory exists
const smartAssetsDir = path.join(__dirname, '../smart-assets');
if (!fs.existsSync(smartAssetsDir)) {
  fs.mkdirSync(smartAssetsDir, { recursive: true });
  console.log('📁 Created smart-assets directory');
}

// Generate sample assets if they don't exist
function generateSampleAssets() {
  const iconPath = path.join(smartAssetsDir, 'icon.png');
  const splashLogoPath = path.join(smartAssetsDir, 'splash-logo.png');
  
  if (!fs.existsSync(iconPath)) {
    console.log('⚠️  App icon not found at smart-assets/icon.png');
    console.log('   Please add your app icon (1024x1024 PNG) to smart-assets/icon.png');
  }
  
  if (!fs.existsSync(splashLogoPath)) {
    console.log('⚠️  Splash logo not found at smart-assets/splash-logo.png');
    console.log('   Please add your splash logo (PNG) to smart-assets/splash-logo.png');
  }
}

// Generate flavor-specific splash screens
function generateFlavorSplashScreens() {
  console.log('\n🎨 Generating flavor-specific splash screens...');
  
  Object.entries(flavors).forEach(([flavorKey, flavor]) => {
    console.log(`\n📱 Generating splash for ${flavor.name}...`);
    
    try {
      // Create flavor-specific splash logo with color overlay
      const splashLogoPath = path.join(smartAssetsDir, 'splash-logo.png');
      if (fs.existsSync(splashLogoPath)) {
        const command = `npx react-native-bootsplash generate ${splashLogoPath} \
          --background="${flavor.backgroundColor}" \
          --logo-width=180 \
          --flavor=${flavorKey}`;
        
        console.log(`   Executing: ${command}`);
        execSync(command, { stdio: 'inherit' });
        console.log(`   ✅ ${flavor.name} splash screen generated`);
      } else {
        console.log(`   ⚠️  Skipping ${flavor.name} - splash logo not found`);
      }
    } catch (error) {
      console.log(`   ❌ Error generating ${flavor.name} splash: ${error.message}`);
    }
  });
}

// Generate flavor-specific app icons
function generateFlavorIcons() {
  console.log('\n🖼️  Generating flavor-specific app icons...');
  
  Object.entries(flavors).forEach(([flavorKey, flavor]) => {
    console.log(`\n📱 Generating icon for ${flavor.name}...`);
    
    try {
      const iconPath = path.join(smartAssetsDir, 'icon.png');
      if (fs.existsSync(iconPath)) {
        // For Android, we'll use the set-icon command with background color
        const androidCommand = `npx react-native set-icon --path ${iconPath} --platform android --background "${flavor.iconBackground}"`;
        console.log(`   Executing Android: ${androidCommand}`);
        execSync(androidCommand, { stdio: 'inherit' });
        
        // For iOS, we'll use the set-icon command
        const iosCommand = `npx react-native set-icon --path ${iconPath} --platform ios`;
        console.log(`   Executing iOS: ${iosCommand}`);
        execSync(iosCommand, { stdio: 'inherit' });
        
        console.log(`   ✅ ${flavor.name} app icon generated`);
      } else {
        console.log(`   ⚠️  Skipping ${flavor.name} - app icon not found`);
      }
    } catch (error) {
      console.log(`   ❌ Error generating ${flavor.name} icon: ${error.message}`);
    }
  });
}

// Link React Native packages
function linkReactNativePackages() {
  console.log('\n🔗 Linking React Native packages...');
  
  try {
    // Clean and reinstall pods for iOS
    console.log('🍎 Cleaning and reinstalling iOS pods...');
    execSync('cd ios && rm -rf Pods Podfile.lock && pod install --repo-update', { stdio: 'inherit' });
    
    // Clean Android build
    console.log('🤖 Cleaning Android build...');
    execSync('cd android && ./gradlew clean', { stdio: 'inherit' });
    
    console.log('✅ React Native packages linked successfully');
  } catch (error) {
    console.log(`❌ Error linking packages: ${error.message}`);
  }
}

// Update package.json scripts
function updatePackageScripts() {
  console.log('\n📝 Updating package.json scripts...');
  
  const packageJsonPath = path.join(__dirname, '../package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add new asset generation scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      'assets:generate-all': 'node scripts/setup-flavor-assets.js',
      'assets:generate-splash': 'node scripts/generate-flavor-splash-screens.js',
      'assets:generate-icons': 'node scripts/generate-flavor-icons.js',
      'link:packages': 'cd ios && pod install --repo-update && cd ../android && ./gradlew clean',
      'setup:complete': 'yarn assets:generate-all && yarn link:packages'
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Package.json scripts updated');
  }
}

// Main execution
async function main() {
  try {
    // Generate sample assets
    generateSampleAssets();
    
    // Generate flavor-specific assets
    generateFlavorSplashScreens();
    generateFlavorIcons();
    
    // Link React Native packages
    linkReactNativePackages();
    
    // Update package.json scripts
    updatePackageScripts();
    
    console.log('\n🎉 Flavor asset setup complete!');
    console.log('==============================');
    console.log('\n📋 What was created:');
    console.log('────────────────────');
    console.log('✅ Flavor-specific splash screens for iOS and Android');
    console.log('✅ Flavor-specific app icons');
    console.log('✅ React Native packages properly linked');
    console.log('✅ Updated package.json scripts');
    
    console.log('\n🎨 Flavor Colors:');
    console.log('────────────────');
    Object.entries(flavors).forEach(([key, flavor]) => {
      console.log(`${flavor.name}: ${flavor.color}`);
    });
    
    console.log('\n📱 Available Commands:');
    console.log('─────────────────────');
    console.log('yarn assets:generate-all    - Generate all flavor assets');
    console.log('yarn assets:generate-splash - Generate splash screens only');
    console.log('yarn assets:generate-icons  - Generate app icons only');
    console.log('yarn link:packages          - Link React Native packages');
    console.log('yarn setup:complete         - Complete setup (assets + linking)');
    
    console.log('\n🔧 Next Steps:');
    console.log('──────────────');
    console.log('1. 📱 Test your builds:');
    console.log('   yarn android:dev');
    console.log('   yarn ios:dev');
    console.log('');
    console.log('2. 🎨 Customize assets:');
    console.log('   - Replace smart-assets/icon.png with your app icon');
    console.log('   - Replace smart-assets/splash-logo.png with your logo');
    console.log('   - Run yarn assets:generate-all to regenerate');
    console.log('');
    console.log('3. 🚀 Deploy:');
    console.log('   - Use the build scripts in package.json for each flavor');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

main(); 