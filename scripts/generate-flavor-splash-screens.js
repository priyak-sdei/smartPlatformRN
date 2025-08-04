const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎨 Generating flavor-specific splash screens...');
console.log('==============================================');

// Flavor configurations with different colors
const flavors = {
  dev: {
    name: 'Development',
    backgroundColor: '#4CAF50',
    logoWidth: 180,
  },
  staging: {
    name: 'Staging',
    backgroundColor: '#FF9800',
    logoWidth: 180,
  },
  production: {
    name: 'Production',
    backgroundColor: '#2196F3',
    logoWidth: 180,
  },
};

// Check if splash logo exists
const splashLogoPath = path.join(__dirname, '../smart-assets/splash-logo.png');
if (!fs.existsSync(splashLogoPath)) {
  console.error('❌ Splash logo not found at smart-assets/splash-logo.png');
  console.error(
    'Please add your splash logo (PNG) to smart-assets/splash-logo.png',
  );
  process.exit(1);
}

// Generate splash screens for each flavor
Object.entries(flavors).forEach(([flavorKey, flavor]) => {
  console.log(`\n📱 Generating splash for ${flavor.name}...`);

  try {
    const command = `npx react-native-bootsplash generate ${splashLogoPath} \
      --background="${flavor.backgroundColor}" \
      --logo-width=${flavor.logoWidth} \
      --flavor=${flavorKey}`;

    console.log(`   Background: ${flavor.backgroundColor}`);
    console.log(`   Logo width: ${flavor.logoWidth}px`);
    console.log(`   Flavor: ${flavorKey}`);

    execSync(command, { stdio: 'inherit' });
    console.log(`   ✅ ${flavor.name} splash screen generated successfully`);
  } catch (error) {
    console.log(
      `   ❌ Error generating ${flavor.name} splash: ${error.message}`,
    );
  }
});

console.log('\n🎉 Splash screen generation complete!');
console.log('=====================================');
console.log('\n📋 Generated for:');
Object.entries(flavors).forEach(([key, flavor]) => {
  console.log(`   ${flavor.name}: ${flavor.backgroundColor}`);
});

console.log('\n🔧 Next Steps:');
console.log('──────────────');
console.log('1. For iOS:');
console.log('   - Open ios/smartPlatformRN.xcworkspace in Xcode');
console.log('   - Ensure BootSplash.storyboard is set as Launch Screen');
console.log('   - Test with: yarn ios:dev');
console.log('');
console.log('2. For Android:');
console.log('   - Check android/app/src/main/res for generated assets');
console.log('   - Test with: yarn android:dev');
console.log('');
console.log('3. Customize:');
console.log('   - Update smart-assets/splash-logo.png with your logo');
console.log('   - Run this script again to regenerate');
