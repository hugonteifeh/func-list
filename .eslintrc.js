module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  //extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    "space-before-function-paren": ["error", "always"],
    "func-call-spacing": ["error", "always"]
  }
};
