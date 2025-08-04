const fs = require('fs');
const path = require('path');

console.log('🎨 Creating sample assets for demonstration...');
console.log('==============================================');

const smartAssetsDir = path.join(__dirname, '../smart-assets');

// Create a simple SVG-based sample icon
const sampleIconSVG = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#grad1)" rx="200" ry="200"/>
  <circle cx="512" cy="512" r="300" fill="white" opacity="0.9"/>
  <text x="512" y="580" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="#667eea">SP</text>
</svg>`;

// Create a simple SVG-based sample splash logo
const sampleSplashLogoSVG = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="80" fill="url(#grad2)"/>
  <text x="100" y="120" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">SP</text>
</svg>`;

// Function to convert SVG to PNG using a simple approach
function createPNGFromSVG(svgContent, outputPath, size) {
  // For demonstration, we'll create a simple text file that explains how to convert
  const instructions = `# Sample Asset File
# This is a placeholder for: ${path.basename(outputPath)}

# To convert this SVG to PNG, you can use:
# 1. Online tools like: https://convertio.co/svg-png/
# 2. Command line tools like ImageMagick: convert input.svg output.png
# 3. Design tools like Figma, Sketch, or Adobe Illustrator

# SVG Content:
${svgContent}

# Requirements:
# - App Icon: 1024x1024 PNG with transparent background
# - Splash Logo: PNG with transparent background (recommended: 200x200px)

# Place the converted PNG file in this location: ${outputPath}
`;

  fs.writeFileSync(outputPath.replace('.png', '.txt'), instructions);
  console.log(`   📝 Created instructions for: ${path.basename(outputPath)}`);
}

// Create sample assets
console.log('\n📱 Creating sample app icon...');
createPNGFromSVG(sampleIconSVG, path.join(smartAssetsDir, 'icon.png'), 1024);

console.log('\n🎨 Creating sample splash logo...');
createPNGFromSVG(
  sampleSplashLogoSVG,
  path.join(smartAssetsDir, 'splash-logo.png'),
  200,
);

console.log('\n✅ Sample assets created successfully!');
console.log('=====================================');
console.log('\n📋 What was created:');
console.log('────────────────────');
console.log('✅ smart-assets/icon.png.txt - Instructions for app icon');
console.log(
  '✅ smart-assets/splash-logo.png.txt - Instructions for splash logo',
);

console.log('\n🔧 Next Steps:');
console.log('──────────────');
console.log('1. Convert the SVG content to PNG files:');
console.log('   - Use online converters or design tools');
console.log('   - Replace the .txt files with actual .png files');
console.log('');
console.log('2. Run the asset generation scripts:');
console.log('   yarn assets:generate-all');
console.log('');
console.log('3. Test your flavors:');
console.log('   yarn ios:dev');
console.log('   yarn android:dev');

console.log('\n💡 Tips:');
console.log('────────');
console.log('- App icon should be 1024x1024 PNG with transparent background');
console.log('- Splash logo should be PNG with transparent background');
console.log('- You can use your own brand assets instead of these samples');
