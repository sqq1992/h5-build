module.exports = {
  prefix: process.env.NODE_ENV === 'development' ? '' : '/h5Build',
  host: process.env.NODE_ENV === 'development' ? 'http://localhost:3701' : 'http://1.15.148.243//page-builder-server'
}