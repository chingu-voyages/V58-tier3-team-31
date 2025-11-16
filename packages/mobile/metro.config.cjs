const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../../');

// require('@expo/env').load(workspaceRoot, { force: true });

const config = getDefaultConfig(projectRoot);

config.watchFolders = [
  projectRoot,
  workspaceRoot,
];

// You might also need to configure `resolver.nodeModulesPaths` for monorepos
   config.resolver.nodeModulesPaths = [
     path.resolve(projectRoot, 'node_modules'),
     path.resolve(workspaceRoot, 'node_modules'),
   ];

// config.resolver.alias = {
// 	"@": __dirname,
// };

config.resolver.assetExts.push('db');
// config = withNativeWind(config, { input: './src/global.css' })
// module.exports = config;
module.exports = withNativeWind(config, { input: './src/global.css' });
