import { path as appRoot } from 'app-root-path'

const entry = `./${process.env.NODE_ENV}.tsx`
const contextRoot = `${appRoot}/project`
const context = `${contextRoot}/src`

export {
  context,
  contextRoot
}
export default {
  entry,
  context,
}
