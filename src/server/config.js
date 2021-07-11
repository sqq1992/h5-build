module.exports = {
  prefix: process.env.NODE_ENV === 'development' ? '' : '/h5Build',
  host: process.env.NODE_ENV === 'development' ? 'http://localhost:9090' : 'https://cqmfe.club/page-builder-server'
}