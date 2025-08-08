const readline = require('readline');
const path = require('path');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function renameApp(appName, bundleId) {
  const rootDir = process.cwd();
  
  // Update package.json
  const packagePath = path.join(rootDir, 'package.json');
  const packageJson = require(packagePath);
  packageJson.name = appName.toLowerCase().replace(/\s+/g, '-');
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

  // Update app.json
  const appJsonPath = path.join(rootDir, 'app.json');
  const appJson = require(appJsonPath);
  appJson.name = appName;
  appJson.displayName = appName;
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

  // Update Android files
  try {
    // Update android/app/build.gradle
    const androidBuildPath = path.join(rootDir, 'android/app/build.gradle');
    let androidBuildGradle = fs.readFileSync(androidBuildPath, 'utf8');
    androidBuildGradle = androidBuildGradle.replace(
      /applicationId "([^"]+)"/,
      `applicationId "${bundleId}"`
    );
    fs.writeFileSync(androidBuildPath, androidBuildGradle);

    // Update android/app/src/main/AndroidManifest.xml
    const androidManifestPath = path.join(rootDir, 'android/app/src/main/AndroidManifest.xml');
    let androidManifest = fs.readFileSync(androidManifestPath, 'utf8');
    androidManifest = androidManifest.replace(
      /package="([^"]+)"/,
      `package="${bundleId}"`
    );
    fs.writeFileSync(androidManifestPath, androidManifest);

    // Update MainActivity.java
    const oldPackageName = packageJson.name;
    const mainActivityPath = path.join(rootDir, `android/app/src/main/java/com/${oldPackageName}/MainActivity.java`);
    if (fs.existsSync(mainActivityPath)) {
      let mainActivity = fs.readFileSync(mainActivityPath, 'utf8');
      mainActivity = mainActivity.replace(
        /package ([^;]+);/,
        `package ${bundleId};`
      );
      
      // Create new directory structure if needed
      const newPackagePath = path.join(rootDir, 'android/app/src/main/java', ...bundleId.split('.'));
      fs.mkdirSync(newPackagePath, { recursive: true });
      
      // Write to new location
      fs.writeFileSync(path.join(newPackagePath, 'MainActivity.java'), mainActivity);
      
      // Remove old directory if different
      if (oldPackageName !== bundleId) {
        fs.rmSync(path.dirname(mainActivityPath), { recursive: true, force: true });
      }
    }
  } catch (error) {
    console.error('Error updating Android files:', error);
  }

  // Update iOS files
  try {
    const iosPath = path.join(rootDir, 'ios');
    const oldName = packageJson.name;
    
    // Rename .xcodeproj directory
    const oldXcodeProjPath = path.join(iosPath, `${oldName}.xcodeproj`);
    const newXcodeProjPath = path.join(iosPath, `${appName}.xcodeproj`);
    if (fs.existsSync(oldXcodeProjPath)) {
      fs.renameSync(oldXcodeProjPath, newXcodeProjPath);
    }

    // Update Info.plist
    const infoPlistPath = path.join(iosPath, oldName, 'Info.plist');
    if (fs.existsSync(infoPlistPath)) {
      let infoPlist = fs.readFileSync(infoPlistPath, 'utf8');
      infoPlist = infoPlist.replace(
        /<string>$(PRODUCT_BUNDLE_IDENTIFIER)<\/string>/,
        `<string>${bundleId}</string>`
      );
      fs.writeFileSync(infoPlistPath, infoPlist);
    }

    // Update project.pbxproj
    const pbxprojPath = path.join(newXcodeProjPath, 'project.pbxproj');
    if (fs.existsSync(pbxprojPath)) {
      let pbxproj = fs.readFileSync(pbxprojPath, 'utf8');
      pbxproj = pbxproj.replace(
        new RegExp(oldName, 'g'),
        appName
      );
      pbxproj = pbxproj.replace(
        /PRODUCT_BUNDLE_IDENTIFIER = "[^"]+"/g,
        `PRODUCT_BUNDLE_IDENTIFIER = "${bundleId}"`
      );
      fs.writeFileSync(pbxprojPath, pbxproj);
    }
  } catch (error) {
    console.error('Error updating iOS files:', error);
  }

  console.log('\nApp renamed successfully!');
  console.log('\nNext steps:');
  console.log('1. Clean the project:');
  console.log('   cd ios && pod install && cd ..');
  console.log('   cd android && ./gradlew clean && cd ..');
  console.log('2. Rebuild and run the app to verify changes.');
}

function validateAppName(name) {
  if (!name || name.trim().length === 0) {
    throw new Error('App name cannot be empty');
  }
  if (!/^[a-zA-Z0-9\s-]+$/.test(name)) {
    throw new Error('App name can only contain letters, numbers, spaces, and hyphens');
  }
  return name;
}

function validateBundleId(bundleId) {
  if (!bundleId || bundleId.trim().length === 0) {
    throw new Error('Bundle ID cannot be empty');
  }
  if (!/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)*\.[a-z0-9_]+[a-z0-9_]$/i.test(bundleId)) {
    throw new Error('Invalid bundle ID format. Example: com.example.app');
  }
  return bundleId;
}
rl.question('Enter New App Name: ', (appName) => {
  try {
    validateAppName(appName);
    
    rl.question('Enter New Bundle ID (e.g., com.example.app): ', (bundleId) => {
      try {
        validateBundleId(bundleId);
        renameApp(appName, bundleId);
        rl.close();
      } catch (error) {
        console.error('\nError:', error.message);
        rl.close();
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('\nError:', error.message);
    rl.close();
    process.exit(1);
  }
});
