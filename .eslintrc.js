module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "react-hooks"],
  "extends": [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "react-hooks/exhaustive-deps": "off",
    "indent": ["error", 2],
    "@typescript-eslint/ban-ts-comment": "off", // 关闭 @ts-ignore 的校验
    "react/prop-types": "warn", // 每个变量需要 type 修改为 warn
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": ["off"]
  }
}
