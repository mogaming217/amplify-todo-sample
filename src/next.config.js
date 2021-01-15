let APP_ENV = process.env.APP_ENV
console.log('launch on', `node: ${process.env.NODE_ENV}`, `app_env: ${APP_ENV}`)

// 環境変数
let envFile
if (!APP_ENV) {
  APP_ENV = 'local'
  const envPath = `env/.env.${APP_ENV}`
  const fs = require('fs')
  fs.statSync(envPath) // envファイルの存在確認
  const DotEnv = require('dotenv-webpack')
  envFile = new DotEnv({ path: envPath, systemvars: true })
}

const nextConfig = {
  webpack: config => {
    // module alias
    config.resolve.alias['@'] = __dirname

    // env
    config.plugins = config.plugins || []
    if (envFile) {
      config.plugins.push(envFile)
    }

    return config
  },
}

module.exports = nextConfig
