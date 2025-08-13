const readline = require('readline');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class WhiteLabelError extends Error {
  constructor(message, details = '') {
    super(message);
    this.name = 'WhiteLabelError';
    this.details = details;
  }
}

async function promptQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

async function confirmAction(message) {
  const answer = await promptQuestion(`${message} (y/N): `);
  return answer.toLowerCase() === 'y';
}

function validateAppName(name) {
  if (!name || name.trim().length === 0) {
    throw new WhiteLabelError('App name cannot be empty');
  }
  if (!/^[a-zA-Z0-9\s-]+$/.test(name)) {
    throw new WhiteLabelError(
      'App name can only contain letters, numbers, spaces, and hyphens',
    );
  }
  return name;
}

function validateBundleId(bundleId) {
  if (!bundleId || bundleId.trim().length === 0) {
    throw new WhiteLabelError('Bundle ID cannot be empty');
  }
  if (
    !/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)*\.[a-z0-9_]+[a-z0-9_]$/i.test(bundleId)
  ) {
    throw new WhiteLabelError(
      'Invalid bundle ID format. Example: com.example.app',
    );
  }
  return bundleId;
}

function updatePackageJson(rootDir, appName) {
  console.log(chalk.blue('📦 Updating package.json...'));
  const packagePath = path.join(rootDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const oldName = packageJson.name;
  packageJson.name = appName.toLowerCase().replace(/\s+/g, '-');
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  return oldName;
}

function updateAppJson(rootDir, appName) {
  console.log(chalk.blue('📱 Updating app.json...'));
  const appJsonPath = path.join(rootDir, 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  appJson.name = appName;
  appJson.displayName = appName;
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
}

function updateAndroidFiles(rootDir, bundleId, oldName) {
  console.log(chalk.green('🤖 Updating Android files...'));

  // Update android/app/build.gradle
  const androidBuildPath = path.join(rootDir, 'android/app/build.gradle');
  let androidBuildGradle = fs.readFileSync(androidBuildPath, 'utf8');
  androidBuildGradle = androidBuildGradle.replace(
    /applicationId "([^"]+)"/,
    `applicationId "${bundleId}"`,
  );
  fs.writeFileSync(androidBuildPath, androidBuildGradle);

  // Update AndroidManifest.xml
  const androidManifestPath = path.join(
    rootDir,
    'android/app/src/main/AndroidManifest.xml',
  );
  let androidManifest = fs.readFileSync(androidManifestPath, 'utf8');
  androidManifest = androidManifest.replace(
    /package="([^"]+)"/,
    `package="${bundleId}"`,
  );
  fs.writeFileSync(androidManifestPath, androidManifest);

  // Handle both Java and Kotlin files
  const sourceDir = path.join(
    rootDir,
    'android/app/src/main/java/com',
    oldName.replace(/-/g, ''),
  );
  const newPackagePath = path.join(
    rootDir,
    'android/app/src/main/java',
    ...bundleId.split('.'),
  );

  // Create new directory structure
  fs.mkdirSync(newPackagePath, { recursive: true });

  // Check and update MainActivity (both .java and .kt)
  ['MainActivity.java', 'MainActivity.kt'].forEach(filename => {
    const filePath = path.join(sourceDir, filename);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/package ([^;]+);/, `package ${bundleId};`);
      fs.writeFileSync(path.join(newPackagePath, filename), content);
    }
  });

  // Check and update MainApplication (both .java and .kt)
  ['MainApplication.java', 'MainApplication.kt'].forEach(filename => {
    const filePath = path.join(sourceDir, filename);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/package ([^;]+);/, `package ${bundleId};`);
      fs.writeFileSync(path.join(newPackagePath, filename), content);
    }
  });

  // Remove old directory if different
  if (oldName !== bundleId) {
    fs.rmSync(sourceDir, { recursive: true, force: true });
  }
}

function updateAndroidWorkspace(rootDir, appName) {
  console.log(
    chalk.green('🛠️ Updating Android workspace name and app labels...'),
  );
  const androidDir = path.join(rootDir, 'android');

  // settings.gradle or settings.gradle.kts -> rootProject.name
  const gradleFiles = ['settings.gradle', 'settings.gradle.kts'];
  for (const filename of gradleFiles) {
    const filePath = path.join(androidDir, filename);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      // rootProject.name = 'OldName'
      content = content.replace(
        /rootProject\.name\s*=\s*['"].+?['"]/,
        `rootProject.name = '${appName}'`,
      );
      fs.writeFileSync(filePath, content);
    }
  }

  // Update app_name in all values/strings.xml across source sets (main, dev, staging, production, debug, release)
  const appDir = path.join(androidDir, 'app', 'src');
  if (fs.existsSync(appDir)) {
    const srcFlavors = fs.readdirSync(appDir);
    for (const flavor of srcFlavors) {
      const stringsPath = path.join(
        appDir,
        flavor,
        'res',
        'values',
        'strings.xml',
      );
      if (fs.existsSync(stringsPath)) {
        try {
          let xml = fs.readFileSync(stringsPath, 'utf8');
          const openTag = '<string name="app_name">';
          const closeTag = '</string>';
          const start = xml.indexOf(openTag);
          const end = xml.indexOf(closeTag, start + openTag.length);
          if (start !== -1 && end !== -1) {
            const before = xml.slice(0, start + openTag.length);
            const after = xml.slice(end);
            xml = `${before}${appName}${after}`;
          }
          fs.writeFileSync(stringsPath, xml);
        } catch (e) {
          // ignore per-file errors, continue
        }
      }
    }
  }
}

function updateAndroidAllManifests(rootDir, bundleId) {
  console.log(
    chalk.green('📝 Updating AndroidManifest packages for all flavors...'),
  );
  const appSrc = path.join(rootDir, 'android', 'app', 'src');
  const stagingId = `${bundleId}.staging`;
  if (!fs.existsSync(appSrc)) return;
  const flavors = fs.readdirSync(appSrc);
  for (const flavor of flavors) {
    const manifest = path.join(appSrc, flavor, 'AndroidManifest.xml');
    const nested = path.join(
      appSrc,
      flavor,
      'src',
      'main',
      'AndroidManifest.xml',
    );
    const candidates = [manifest, nested].filter(fs.existsSync);
    for (const m of candidates) {
      try {
        let xml = fs.readFileSync(m, 'utf8');
        const id = flavor.toLowerCase().includes('staging')
          ? stagingId
          : bundleId;
        xml = xml.replace(/package="([^"]+)"/, `package="${id}"`);
        fs.writeFileSync(m, xml);
      } catch {}
    }
  }
}

function updateAndroidFlavorsGradle(rootDir, appName, bundleId) {
  console.log(chalk.green('🍭 Updating Android productFlavors defaults...'));
  const gradlePath = path.join(rootDir, 'android', 'app', 'build.gradle');
  if (!fs.existsSync(gradlePath)) return;
  let g = fs.readFileSync(gradlePath, 'utf8');

  // Update applicationId fallbacks inside getEnvVar() for each flavor
  const replaceFallback = (flavor, id) => {
    const re = new RegExp(
      `applicationId\\s+getEnvVar\\(\\s*["']${flavor}["']\\s*,\\s*["']APP_BUNDLE_ID["']\\s*,\\s*["'][^"']+["']\\s*\\)`,
      'g',
    );
    g = g.replace(
      re,
      `applicationId getEnvVar("${flavor}", "APP_BUNDLE_ID", "${id}")`,
    );
  };
  replaceFallback('dev', bundleId);
  replaceFallback('staging', `${bundleId}.staging`);
  replaceFallback('production', bundleId);

  // Update app_name fallbacks
  const replaceAppName = (flavor, name) => {
    const re = new RegExp(
      `resValue\\s+"string",\\s+"app_name",\\s+getEnvVar\\(\\s*["']${flavor}["']\\s*,\\s*["']APP_NAME["']\\s*,\\s*["'][^"']+["']\\s*\\)`,
      'g',
    );
    g = g.replace(
      re,
      `resValue "string", "app_name", getEnvVar("${flavor}", "APP_NAME", "${name}")`,
    );
  };
  replaceAppName('dev', `${appName}`);
  replaceAppName('staging', `${appName}-Staging`);
  replaceAppName('production', `${appName}`);

  fs.writeFileSync(gradlePath, g);
}

function updateIosFiles(rootDir, appName, bundleId, oldName) {
  console.log(chalk.blue('🍎 Updating iOS files...'));
  const iosPath = path.join(rootDir, 'ios');

  // Rename .xcodeproj directory
  const oldXcodeProjPath = path.join(iosPath, `${oldName}.xcodeproj`);
  const newXcodeProjPath = path.join(iosPath, `${appName}.xcodeproj`);
  if (fs.existsSync(oldXcodeProjPath) && !fs.existsSync(newXcodeProjPath)) {
    fs.renameSync(oldXcodeProjPath, newXcodeProjPath);
  }

  // Rename main app directory
  const oldAppPath = path.join(iosPath, oldName);
  const newAppPath = path.join(iosPath, appName);
  if (fs.existsSync(oldAppPath) && !fs.existsSync(newAppPath)) {
    fs.renameSync(oldAppPath, newAppPath);
  }

  // Update Info.plist files
  const infoPlistPaths = [
    path.join(newAppPath, 'Info.plist'),
    path.join(iosPath, `${appName}Tests/Info.plist`),
  ];

  infoPlistPaths.forEach(plistPath => {
    if (fs.existsSync(plistPath)) {
      let infoPlist = fs.readFileSync(plistPath, 'utf8');
      infoPlist = infoPlist.replace(
        /<string>$(PRODUCT_BUNDLE_IDENTIFIER)<\/string>/,
        `<string>${bundleId}</string>`,
      );
      fs.writeFileSync(plistPath, infoPlist);
    }
  });

  // Update project.pbxproj
  const pbxprojPath = path.join(newXcodeProjPath, 'project.pbxproj');
  if (fs.existsSync(pbxprojPath)) {
    let pbxproj = fs.readFileSync(pbxprojPath, 'utf8');
    pbxproj = pbxproj.replace(new RegExp(oldName, 'g'), appName);
    pbxproj = pbxproj.replace(
      /PRODUCT_BUNDLE_IDENTIFIER = "[^"]+"/g,
      `PRODUCT_BUNDLE_IDENTIFIER = "${bundleId}"`,
    );
    fs.writeFileSync(pbxprojPath, pbxproj);
  }
}

function detectIosBaseNames(rootDir) {
  const iosDir = path.join(rootDir, 'ios');
  const items = fs.readdirSync(iosDir);
  const xcodeproj = items.find(
    name => name.endsWith('.xcodeproj') && name !== 'Pods.xcodeproj',
  );
  const xcworkspace = items.find(
    name => name.endsWith('.xcworkspace') && name !== 'Pods.xcworkspace',
  );

  const baseProjectName = xcodeproj
    ? path.basename(xcodeproj, '.xcodeproj')
    : 'smartPlatformRN';
  const baseWorkspaceName = xcworkspace
    ? path.basename(xcworkspace, '.xcworkspace')
    : baseProjectName;

  return { baseProjectName, baseWorkspaceName };
}

function copyDirRecursive(source, destination) {
  if (fs.cpSync) {
    fs.cpSync(source, destination, { recursive: true });
    return;
  }
  // Fallback for older Node
  if (!fs.existsSync(destination))
    fs.mkdirSync(destination, { recursive: true });
  const entries = fs.readdirSync(source, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(source, entry.name);
    const dst = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(src, dst);
    } else if (entry.isSymbolicLink()) {
      const link = fs.readlinkSync(src);
      fs.symlinkSync(link, dst);
    } else {
      fs.copyFileSync(src, dst);
    }
  }
}

function cloneIosProject(rootDir, baseName, newName) {
  console.log(chalk.blue('📁 Cloning iOS project folders...'));
  const iosDir = path.join(rootDir, 'ios');

  const baseAppDir = path.join(iosDir, baseName);
  const newAppDir = path.join(iosDir, newName);
  if (fs.existsSync(baseAppDir) && !fs.existsSync(newAppDir)) {
    copyDirRecursive(baseAppDir, newAppDir);
  }

  const baseProjDir = path.join(iosDir, `${baseName}.xcodeproj`);
  const newProjDir = path.join(iosDir, `${newName}.xcodeproj`);
  if (fs.existsSync(baseProjDir) && !fs.existsSync(newProjDir)) {
    copyDirRecursive(baseProjDir, newProjDir);
  }

  const baseWsDir = path.join(iosDir, `${baseName}.xcworkspace`);
  const newWsDir = path.join(iosDir, `${newName}.xcworkspace`);
  if (fs.existsSync(baseWsDir) && !fs.existsSync(newWsDir)) {
    copyDirRecursive(baseWsDir, newWsDir);
  }

  // Update workspace refs if the new workspace exists
  const wsDataPath = path.join(newWsDir, 'contents.xcworkspacedata');
  if (fs.existsSync(wsDataPath)) {
    let wsData = fs.readFileSync(wsDataPath, 'utf8');
    const fromRef = `group:${baseName}.xcodeproj`;
    const toRef = `group:${newName}.xcodeproj`;
    wsData = wsData.split(fromRef).join(toRef);
    fs.writeFileSync(wsDataPath, wsData);
  }

  // Update pbxproj to new target/product names
  const pbxprojPath = path.join(newProjDir, 'project.pbxproj');
  if (fs.existsSync(pbxprojPath)) {
    let pbx = fs.readFileSync(pbxprojPath, 'utf8');
    // Replace specific flavored names first to avoid partial collisions
    pbx = pbx.replace(new RegExp(`${baseName}-dev`, 'g'), `${newName}-dev`);
    pbx = pbx.replace(
      new RegExp(`${baseName}-staging`, 'g'),
      `${newName}-staging`,
    );
    pbx = pbx.split(`${baseName}.app`).join(`${newName}.app`);
    pbx = pbx.replace(new RegExp(baseName, 'g'), newName);
    fs.writeFileSync(pbxprojPath, pbx);
  }
}

function ensureFlavorPlists(rootDir, appName) {
  console.log(chalk.blue('🧩 Ensuring iOS flavor Info.plist files...'));
  const iosDir = path.join(rootDir, 'ios');
  // Use base Info.plist as template
  const baseInfo = path.join(iosDir, appName, 'Info.plist');
  const templateCandidates = [
    baseInfo,
    path.join(iosDir, 'smartPlatformRN', 'Info.plist'),
  ];
  const template = templateCandidates.find(p => fs.existsSync(p));
  if (!template) {
    console.log(
      chalk.yellow(
        '⚠️  No base Info.plist template found. Skipping flavor Info.plist creation.',
      ),
    );
    return;
  }

  const devPlist = path.join(iosDir, `${appName}Dev-Info.plist`);
  const stagingPlist = path.join(iosDir, `${appName}Staging-Info.plist`);

  const createIfMissing = (targetPath, displayName) => {
    if (!fs.existsSync(targetPath)) {
      let content = fs.readFileSync(template, 'utf8');
      content = content.replace(
        /<key>CFBundleDisplayName<\/key>[\s\S]*?<string>.*?<\/string>/,
        `<key>CFBundleDisplayName<\/key>\n\t<string>${displayName}<\/string>`,
      );
      fs.writeFileSync(targetPath, content);
      console.log(chalk.green(`✅ Created ${path.basename(targetPath)}`));
    }
  };

  createIfMissing(devPlist, `${appName}-dev`);
  createIfMissing(stagingPlist, `${appName}-staging`);
}

function updateIosBundleIdentifiers(rootDir, appName, bundleId, baseName) {
  console.log(
    chalk.blue('🏷️ Updating iOS bundle identifiers and plist references...'),
  );
  const iosDir = path.join(rootDir, 'ios');
  const projPath = path.join(iosDir, `${appName}.xcodeproj`, 'project.pbxproj');
  if (!fs.existsSync(projPath)) return;
  let pbx = fs.readFileSync(projPath, 'utf8');

  // Update bundle identifiers
  const stagingId = `${bundleId}.staging`;
  pbx = pbx.replace(
    /PRODUCT_BUNDLE_IDENTIFIER\s*=\s*com\.baseSetup\.staging/g,
    `PRODUCT_BUNDLE_IDENTIFIER = ${stagingId}`,
  );
  pbx = pbx.replace(
    /PRODUCT_BUNDLE_IDENTIFIER\s*=\s*com\.baseSetup(?!\.)/g,
    `PRODUCT_BUNDLE_IDENTIFIER = ${bundleId}`,
  );

  // Update Info.plist references to new flavor files
  const fromDev = `${baseName}Dev-Info.plist`;
  const fromStaging = `${baseName}Staging-Info.plist`;
  const toDev = `${appName}Dev-Info.plist`;
  const toStaging = `${appName}Staging-Info.plist`;
  pbx = pbx
    .split(`INFOPLIST_FILE = "${fromDev}"`)
    .join(`INFOPLIST_FILE = "${toDev}"`);
  pbx = pbx
    .split(`INFOPLIST_FILE = ${fromDev}`)
    .join(`INFOPLIST_FILE = ${toDev}`);
  pbx = pbx
    .split(`INFOPLIST_FILE = "${fromStaging}"`)
    .join(`INFOPLIST_FILE = "${toStaging}"`);
  pbx = pbx
    .split(`INFOPLIST_FILE = ${fromStaging}`)
    .join(`INFOPLIST_FILE = ${toStaging}`);

  fs.writeFileSync(projPath, pbx);
}

function updateEnvFiles(rootDir, appName, bundleId) {
  console.log(chalk.blue('🧾 Updating config/env.* files...'));
  const cfgDir = path.join(rootDir, 'config');
  const files = [
    { name: 'env.dev', app: `${appName}-dev`, id: bundleId },
    {
      name: 'env.staging',
      app: `${appName}-staging`,
      id: `${bundleId}.staging`,
    },
    { name: 'env.production', app: `${appName}`, id: bundleId },
  ];

  for (const f of files) {
    const p = path.join(cfgDir, f.name);
    if (!fs.existsSync(p)) continue;
    let text = fs.readFileSync(p, 'utf8');
    if (text.match(/^APP_NAME\s*=\s*.*/m)) {
      text = text.replace(/^APP_NAME\s*=\s*.*/m, `APP_NAME=${f.app}`);
    } else {
      text = `${text.trim()}\nAPP_NAME=${f.app}\n`;
    }
    if (text.match(/^APP_BUNDLE_ID\s*=\s*.*/m)) {
      text = text.replace(/^APP_BUNDLE_ID\s*=\s*.*/m, `APP_BUNDLE_ID=${f.id}`);
    } else {
      text = `${text.trim()}\nAPP_BUNDLE_ID=${f.id}\n`;
    }
    fs.writeFileSync(p, text);
  }
}

function updatePackageJsonIosScripts(rootDir, oldBase, newBase) {
  const pkgPath = path.join(rootDir, 'package.json');
  if (!fs.existsSync(pkgPath)) return;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (pkg.scripts) {
    const keys = Object.keys(pkg.scripts);
    for (const key of keys) {
      let val = pkg.scripts[key];
      if (typeof val !== 'string') continue;
      val = val
        .split(`${oldBase}.xcworkspace`)
        .join(`${newBase}.xcworkspace`)
        .replace(new RegExp(`${oldBase}-dev`, 'g'), `${newBase}-dev`)
        .replace(new RegExp(`${oldBase}-staging`, 'g'), `${newBase}-staging`)
        .replace(new RegExp(`${oldBase}(?=[^a-zA-Z0-9-_]|$)`, 'g'), newBase);
      pkg.scripts[key] = val;
    }
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }
}

/**
 * Update iOS Podfile to point to the correct Xcode project and flavor targets
 * - Renames target blocks to use the new app name (base, -dev, -staging, -production)
 * - Updates `project '<name>.xcodeproj'` if the new Xcode project exists
 */
function updatePodfileTargets(rootDir, appName) {
  console.log(chalk.blue('🧭 Updating Podfile targets...'));
  const podfilePath = path.join(rootDir, 'ios', 'Podfile');
  if (!fs.existsSync(podfilePath)) {
    console.log(chalk.yellow('⚠️  Podfile not found, skipping Podfile update'));
    return;
  }

  let content = fs.readFileSync(podfilePath, 'utf8');

  // Identify current base target name from target blocks (excluding Pods/AppPods abstract targets)
   
  const targetRegex = /target\s+'([^']+)'\s+do/g;
  const foundNames = new Set();
  let match;
  while ((match = targetRegex.exec(content)) !== null) {
    const name = match[1];
    if (name === 'Pods' || name === 'AppPods') continue;
    // Normalize base by removing a known suffix
    const base = name.replace(/-(dev|staging|production)$/i, '');
    foundNames.add(base);
  }

  // Choose the first detected base name, default to smartPlatformRN if none detected
  const [oldBaseTarget = 'smartPlatformRN'] = Array.from(foundNames);

  // Replace target names: base, -dev, -staging, -production
  const suffixes = ['', '-dev', '-staging', '-production'];
  for (const suffix of suffixes) {
    const prev = `${oldBaseTarget}${suffix}`;
    const next = `${appName}${suffix}`;
    const re = new RegExp(
      "(target\\s+')" + prev.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + "(')",
      'g',
    );
    content = content.replace(re, `$1${next}$2`);
  }

  // Update the `project '<name>.xcodeproj'` directive only if new project exists
  const iosDir = path.join(rootDir, 'ios');
  const newProjPath = path.join(iosDir, `${appName}.xcodeproj`);
  const hasNewProj = fs.existsSync(newProjPath);
  if (hasNewProj) {
    content = content.replace(
      /project\s+'[^']+\.xcodeproj'/,
      `project '${appName}.xcodeproj'`,
    );
  }

  fs.writeFileSync(podfilePath, content);
  console.log(chalk.green('✅ Podfile targets updated'));
}

async function cleanAndRebuild(rootDir) {
  console.log(chalk.yellow('🧹 Cleaning and rebuilding project...'));

  try {
    // Clean and rebuild iOS
    console.log(chalk.blue('Installing iOS pods...'));
    execSync('cd ios && rm -rf Pods Podfile.lock && pod install', {
      stdio: 'inherit',
      cwd: rootDir,
    });

    // Clean and rebuild Android
    console.log(chalk.green('Cleaning Android build...'));
    execSync('cd android && ./gradlew clean', {
      stdio: 'inherit',
      cwd: rootDir,
    });

    console.log(chalk.yellow('Installing node modules...'));
    execSync('yarn install', {
      stdio: 'inherit',
      cwd: rootDir,
    });
  } catch (error) {
    throw new WhiteLabelError(
      'Failed to clean and rebuild project',
      error.message,
    );
  }
}

async function main() {
  try {
    console.log(chalk.bold('\n🎨 React Native White Labeling Tool\n'));

    const appName = await promptQuestion('📱 Enter New App Name: ');
    validateAppName(appName);

    const bundleId = await promptQuestion(
      '🔑 Enter New Bundle ID (e.g., com.example.app): ',
    );
    validateBundleId(bundleId);

    const proceed = await confirmAction(
      chalk.yellow(
        '\n⚠️  This will modify your project files. Make sure you have committed your changes. Proceed?',
      ),
    );

    if (!proceed) {
      console.log(chalk.red('\n❌ Operation cancelled by user'));
      process.exit(0);
    }

    const rootDir = process.cwd();
    console.log(chalk.cyan('\n🚀 Starting white labeling process...\n'));

    const oldName = updatePackageJson(rootDir, appName);
    updateAppJson(rootDir, appName);
    updateAndroidFiles(rootDir, bundleId, oldName);
    updateAndroidWorkspace(rootDir, appName);
    updateAndroidAllManifests(rootDir, bundleId);
    updateAndroidFlavorsGradle(rootDir, appName, bundleId);
    // Detect current iOS base names (project/workspace)
    const { baseProjectName, baseWorkspaceName } = detectIosBaseNames(rootDir);
    // Create fresh new iOS folders and project/workspace with the new name
    cloneIosProject(rootDir, baseProjectName, appName);
    // Update Xcode project internals and Info/Bundle IDs
    updateIosFiles(rootDir, appName, bundleId, baseProjectName);
    ensureFlavorPlists(rootDir, appName);
    updateIosBundleIdentifiers(rootDir, appName, bundleId, baseProjectName);
    updatePodfileTargets(rootDir, appName);
    // Update iOS scripts in package.json to reference the new workspace and schemes
    updatePackageJsonIosScripts(rootDir, baseWorkspaceName, appName);
    // Update env files to propagate new names and bundle IDs for Android/iOS tooling
    updateEnvFiles(rootDir, appName, bundleId);

    const shouldRebuild = await confirmAction(
      chalk.yellow('\n🔄 Would you like to clean and rebuild the project now?'),
    );

    if (shouldRebuild) {
      await cleanAndRebuild(rootDir);
    }

    console.log(chalk.green('\n✅ White labeling completed successfully!\n'));

    if (!shouldRebuild) {
      console.log(
        chalk.cyan('To complete the setup, run the following commands:'),
      );
      console.log(chalk.yellow('\n1. Clean and install iOS dependencies:'));
      console.log(
        '   cd ios && rm -rf Pods Podfile.lock && pod install && cd ..',
      );
      console.log(chalk.yellow('\n2. Clean Android build:'));
      console.log('   cd android && ./gradlew clean && cd ..');
      console.log(chalk.yellow('\n3. Reinstall node modules:'));
      console.log('   yarn install\n');
    }
  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    if (error.details) {
      console.error(chalk.red(`Details: ${error.details}`));
    }
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
