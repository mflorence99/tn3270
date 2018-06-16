set -e
npm run build
npm version patch
npm publish
sleep 15s
pushd ../el-3270
rm -rf node_modules/tn3270
npm install
popd
