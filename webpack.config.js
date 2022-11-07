const path = require('path');

module.exports = {
  mode: 'development',
  entry:{
    app2:"./src/app2.js",
    app3:"./src/app3.js",
  } ,                  // 変換元のエントリーポイントファイルを指定します。
  output: {
    path: path.resolve(__dirname, 'dist'),  // 変換したファイルの出力先フォルダパスと、
    filename: "[name].bundle.js"                   // 出力するファイル名を指定します。
  },
  devtool: 'eval-source-map',
  watch: true,
};