module.exports = {
  env: {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  },

  globals: {
    "process": true
  },

  // 현재 eslintrc 파일을 기준으로 ESLint 규칙을 적용
  root: true,

  // 추가적인 규칙들을 적용
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],

  plugins: [
    'vue',
  ],

  // 사용자 편의 규칙 추가
  rules: {
    "quotes": [2, "single", {
      "avoidEscape": true
    }],
    "no-console": process.env.STAGE === "prod" ? "error" : "warn",
    "semi": [2, "always"],
    "keyword-spacing": ["error", {
      "after": true
    }]
  }
};