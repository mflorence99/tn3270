npm run build
git add publish.sh
git add lib/*
git add src/*
git commit -m "Prepare to publish"
git push origin master
set -e
npm run build
npm version patch
npm publish
pushd ../el-3270
rm -rf node_modules/tn3270
npm install
popd
