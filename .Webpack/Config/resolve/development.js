import { context, contextRoot } from '!/Config/entry'
import { path as appRoot } from 'app-root-path'

import fs from 'fs'

import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const alias = {
  '^': appRoot,
  '~': context
}

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.json', '.xml']

const plugins = [new TsconfigPathsPlugin({
  configFile: `${appRoot}/.tsconfig.json`,
  logLevel: 'info',
  extensions,
  mainFields: ['browser', 'main'],
})]

fs.readdirSync(contextRoot).forEach((dir) => {
  const path = `${contextRoot}/${dir}`
  
  if (!fs.statSync(path).isDirectory()) {
    return
  }
  
  alias[dir] = path
})

fs.readdirSync(context).forEach((dir) => {
  const path = `${context}/${dir}`
  
  if (!fs.statSync(path).isDirectory()) {
    return
  }
  
  alias[dir] = path
})

const resolve = {
  alias,
  extensions,
  modules: [`${appRoot}/node_modules`],
  plugins,
}

export {
  resolve,
}
export default {
  resolve: Object.assign(
    resolve, {
      alias: Object.assign(resolve.alias, {
        ['react-dom']: '@hot-loader/react-dom'
      })
    }
  ),
}
