mkdir -p build
browserify index.ts -p [ tsify ] -t browserify-css > build/index_bundle.js
#browserify -t browserify-css app.js > bundle.js
