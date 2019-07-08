set -e
npm run build
npm version patch
npm publish
