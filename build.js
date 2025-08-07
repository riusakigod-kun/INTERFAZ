const webpack = require('webpack');
const config = require('./webpack.config.js');

const compiler = webpack(config({ mode: 'production' }));

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  
  console.log(stats.toString({ colors: true }));
  
  if (stats.hasErrors()) {
    process.exit(1);
  }
  
  console.log('Build completed successfully!');
});

{
  "scripts": {
    "build": "node build.js"
  }
}