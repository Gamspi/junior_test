const path = require('path') // const PATH = require('./CONSTANTS')
const fs = require('fs')

const getEnteries = () => {
  const pagesPath = path.resolve(__dirname, '../src/pages')// `${PATH.src}/pages`
  const pagesDirs = fs.readdirSync(pagesPath)

  const pages = pagesDirs.map((pageDirName) => {
    const name = pageDirName
    const pagePath = `${pagesPath}//${name}`
    return { path: pagePath, name }
  })

  return pages
}

module.exports = { getEnteries }
