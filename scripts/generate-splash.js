// ./scripts/generate-splash.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logoPath = path.resolve(__dirname, '../smart-assets/splash-logo.png');
const backgroundColorFilePath = path.resolve(
  __dirname,
  '../smart-assets/splash-background.txt',
);
const defaultBackgroundColor = 'FFFFFF'; // Default pure white, no # prefix for bootsplash CLI
let backgroundColor = defaultBackgroundColor;

// Check if the logo file exists
if (!fs.existsSync(logoPath)) {
  console.error(`Error: Splash logo not found at ${logoPath}`);
  console.error('Please make sure splash-logo.png exists in smart-assets/');
  process.exit(1);
}

// Try to read background color from file
if (fs.existsSync(backgroundColorFilePath)) {
  const colorFromFile = fs.readFileSync(backgroundColorFilePath, 'utf8').trim();
  if (colorFromFile) {
    backgroundColor = colorFromFile.startsWith('#')
      ? colorFromFile.substring(1)
      : colorFromFile;
  }
}

const logoWidth = 180; // Adjust as needed

const command = `npx react-native-bootsplash generate ${logoPath} \
  --background="${backgroundColor}" \
  --logo-width=${logoWidth} \
  --flavor=main`; // Use 'main' or your specific Android flavor

console.log(`Generating splash screen with background #${backgroundColor}...`);
console.log(`Executing: ${command}`);

try {
  execSync(command, { stdio: 'inherit' });
  console.log('Splash screen assets generated successfully!');
  console.log(
    'react-native-bootsplash should have placed the assets in the correct native directories.',
  );
  console.log(
    'For iOS, ensure the BootSplash.storyboard is used as your Launch Screen file in Xcode project settings.',
  );
  console.log(
    'For Android, ensure the generated resources are correctly picked up (check android/app/src/main/res).',
  );
  console.log(
    'Remember to run pod install for iOS: cd ios && pod install --repo-update',
  );
} catch (error) {
  console.error('Error generating splash screen:', error.message);
  process.exit(1);
}
