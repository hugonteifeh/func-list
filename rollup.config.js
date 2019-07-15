import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: {
      file: 'build/index.js',
      name: 'func-list',
      format: 'umd'
    ,
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],}
  };