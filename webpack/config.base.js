module.exports = {
  entry: {
    main: './src/main.tsx',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      { test: /\.s?css$/,
        loader: 'style-loader',
      },
      { test: /\.s?css$/,
        loader: 'css-loader',
      },
      { test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          config: {
            path: __dirname,
          },
        },
      },
      { test: /\.scss$/,
        loader: 'sass-loader',
      },
      { test: /\.(svg|eot|woff|ttf|svg|woff2)$/,
        use: [
          { loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
