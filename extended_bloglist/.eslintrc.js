module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
    'react-app',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'linebreak-style': 0, 
    'require-jsdoc': 0,
  },
};
