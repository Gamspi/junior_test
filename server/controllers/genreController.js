const bd = require('../bd/bd')
class GenreController {
  async filter (req, res) {
    let { id } = req.query
    id = id.toLowerCase()
    if (id) {
      if (id === 'all') {
        res.json(bd)
      } else {
        const value = bd.filter((item) => {
          return item.genres.includes(id)
        })
        res.json(value)
      }
    }
  }
}

module.exports = new GenreController()
