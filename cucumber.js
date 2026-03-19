module.exports = {
  default: {
    paths: ["src/features/*.feature"],
    require: ["tests/steps/*.js", "src/hooks/*.js"],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],
    timeout: 60000
  }
};