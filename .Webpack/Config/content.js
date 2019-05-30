import CopyPlugin from '!/Plugins/CopyPlugin'

const srcRoot = 'project/content';

const copier = new CopyPlugin( {
  srcRoot,
  dest: 'content'
} );

export {
  srcRoot
}
export default {
  plugins: [ copier ],
}
