// Example Electron configuration
// Install electron: npm install --save-dev electron electron-builder
// Then rename this file to electron.config.js and configure as needed

module.exports = {
  appId: "com.webmarket.app",
  productName: "Web–Market",
  directories: {
    output: "dist-electron",
  },
  files: ["out/**/*", "package.json"],
  mac: {
    category: "public.app-category.utilities",
  },
  win: {
    target: "nsis",
  },
  linux: {
    target: "AppImage",
  },
};
