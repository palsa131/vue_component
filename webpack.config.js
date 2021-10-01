const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")
const HtmlPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
module.exports = {
  resolve: {
    extensions: [".vue", ".js"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/, //.vue로 끝나는 파일만 찾는다 exp.text('.vue')
        use: "vue-loader", // 위의 test에서 찾으면 vue-loader를 이용할거다.
      },
      {
        test: /\.s?css$/, //s가 없거나 있거나
        use: ["vue-style-loader", "css-loader", "sass-loader"], // 작성순서 중요
        // 먼저 실행되어야 하는것이 나중에 작성되어야함
        // 해석 순서는 아래에서 위 오른쪽에서 왼쪽 이기 때문
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: "src/index.html",
      // 여기서는 path.resolve(__dirname ) 부분은 생략가능
    }),
    new CopyPlugin({
      patterns: [
        { from: "static" },
        //static 폴더에서 file을 복사해서 dist로
        //to: 옵션은 생략가능
      ],
    }),
  ],
}
