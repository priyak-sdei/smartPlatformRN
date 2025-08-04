const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🖼️  Generating flavor-specific app icons...');
console.log('===========================================');

// Flavor configurations with different background colors
const flavors = {
  dev: {
    name: 'Development',
    backgroundColor: '#4CAF50'
  },
  staging: {
    name: 'Staging',
    backgroundColor: '#FF9800'
  },
  production: {
    name: 'Production',
    backgroundColor: '#2196F3'
  }
};

// Check if app icon exists
const iconPath = path.join(__dirname, '../smart-assets/icon.png');
if (!fs.existsSync(iconPath)) {
  console.error('❌ App icon not found at smart-assets/icon.png');
  console.error('Please add your app icon (1024x1024 PNG) to smart-assets/icon.png');
  process.exit(1);
}

// Generate app icons for each flavor
Object.entries(flavors).forEach(([flavorKey, flavor]) => {
  console.log(`\n📱 Generating app icon for ${flavor.name}...`);
  
  try {
    // For Android, use background color
    console.log(`   🖼️  Android icon with background: ${flavor.backgroundColor}`);
    const androidCommand = `npx react-native set-icon --path ${iconPath} --platform android --background "${flavor.backgroundColor}"`;
    execSync(androidCommand, { stdio: 'inherit' });
    
    // For iOS, use default (no background color needed)
    console.log(`   🖼️  iOS icon`);
    const iosCommand = `npx react-native set-icon --path ${iconPath} --platform ios`;
    execSync(iosCommand, { stdio: 'inherit' });
    
    console.log(`   ✅ ${flavor.name} app icon generated successfully`);
    
  } catch (error) {
    console.log(`   ❌ Error generating ${flavor.name} icon: ${error.message}`);
  }
});

console.log('\n🎉 App icon generation complete!');
console.log('================================');
console.log('\n📋 Generated for:');
Object.entries(flavors).forEach(([key, flavor]) => {
  console.log(`   ${flavor.name}: ${flavor.backgroundColor}`);
});

console.log('\n🔧 Next Steps:');
console.log('──────────────');
console.log('1. For iOS:');
console.log('   - Open ios/smartPlatformRN.xcworkspace in Xcode');
console.log('   - Check that app icons are properly set in Assets.xcassets');
console.log('   - Test with: yarn ios:dev');
console.log('');
console.log('2. For Android:');
console.log('   - Check android/app/src/main/res for generated mipmap folders');
console.log('   - Test with: yarn android:dev');
console.log('');
console.log('3. Customize:');
console.log('   - Update smart-assets/icon.png with your app icon (1024x1024 PNG)');
console.log('   - Run this script again to regenerate');
console.log('');
console.log('4. Clean builds:');
console.log('   - iOS: cd ios && rm -rf build && pod install');
console.log('   - Android: cd android && ./gradlew clean');
