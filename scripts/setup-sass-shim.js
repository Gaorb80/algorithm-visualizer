const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'node_modules', 'node-sass');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(
  path.join(targetDir, 'index.js'),
  "module.exports = require('sass');\n"
);

fs.writeFileSync(
  path.join(targetDir, 'package.json'),
  JSON.stringify({ name: 'node-sass', version: '4.12.0', main: 'index.js' }, null, 2)
);

console.log('[Setup] Created node-sass shim to use modern sass engine.');
