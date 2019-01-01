module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "extends": ["airbnb-base"],
  "plugins": [
    "json",
    "no-only-tests"
  ],
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module"
  },
  "rules": {
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never"
    }],
    "consistent-return": "off",
    "func-names": ["error"],
    "global-require": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*test*.js", "**/*.spec.js"]}],
    "import/newline-after-import": "off",
    "indent": ["error", 2],
    "max-len": ["error", {
      "code": 120,
      "ignoreTrailingComments": true,
      "ignoreTemplateLiterals": true
    }],
    "no-param-reassign": "off",
    "no-shadow": "off",
    "no-use-before-define": ["error", "nofunc"],
    "no-underscore-dangle": ["error", { "allow": ["_furtherAuthorizations", "_control", "_clientId", "_source"] }],
    "no-unused-expressions": "off",
    "no-only-tests/no-only-tests": "error"
  },
  "globals": {
    "before": true,
    "after": true,
  }
};
