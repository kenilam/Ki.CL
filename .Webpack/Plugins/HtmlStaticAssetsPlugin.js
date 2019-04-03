import { Args, Wildcard } from '!/Utilities'
import glob from 'glob'

const removeDuplicatedPath = (path, index, paths) => paths.indexOf(path) === index

class HtmlStaticAssetsPlugin {
  constructor ({
    srcRoot
  }) {
    this.srcRoot = srcRoot
    
    this.addAssets = this.addAssets.bind(this)
    this.compilation = this.compilation.bind(this)
    this.replaceSharedPathWithChunk = this.replaceSharedPathWithChunk.bind(
      this,
    )
  }
  
  addAssets (assets, pattern) {
    return [].concat(
      assets,
      glob
      .sync(
        `${this.srcRoot}/${Wildcard([Args.shared, this.chunk])}/${pattern}`,
      )
      .map(this.replaceSharedPathWithChunk)
      .filter(removeDuplicatedPath),
    )
  }
  
  compilation (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', (data) => {
      const {
        assets
      } = data
      const {
        css,
        js
      } = assets
      
      this.chunk = Object.keys(assets.chunks)[0]
      
      assets.css = this.addAssets(css || [], '**/*.css')
      assets.js = this.addAssets(js || [], '**/*.js')
    })
  }
  
  replaceSharedPathWithChunk (path) {
    return `/${path.replace(Args.shared, this.chunk)}`
  }
  
  apply (compiler) {
    compiler.hooks.run.tap('compilation', this.compilation)
  }
}

export default HtmlStaticAssetsPlugin
