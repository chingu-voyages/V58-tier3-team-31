const { getDefaultConfig } = require("expo/metro-config");
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../../');

require('@expo/env').load(workspaceRoot, { force: true });

const config = getDefaultConfig(projectRoot);

// You might also need to configure `resolver.nodeModulesPaths` for monorepos
   config.resolver.nodeModulesPaths = [
     path.resolve(projectRoot, 'node_modules'),
     path.resolve(workspaceRoot, 'node_modules'),
   ];

// config.resolver.alias = {
// 	"@": __dirname,
// };

module.exports = config;
