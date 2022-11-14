const bd = require('../bd/bd')
class GenreController {
  async filter (req, res) {
    const { id } = req.query
    if (id) {
      const value = bd.filter((item) => {
        return item.genres.includes(id.toLowerCase())
      })
      res.json(value)
    }
  }
}

module.exports = new GenreController()
