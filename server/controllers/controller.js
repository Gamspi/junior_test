let bd = require('../bd/bd')

class GenreController {
  async filter (req, res) {
    let { id } = req.query
    id = id.toLowerCase()
    if (id) {
      if (id === 'all') {
        res.json({
          data: bd.sort((a, b) => a.id - b.id),
          status: 'success',
          message: ''
        })
      } else {
        const value = bd.filter((item) => {
          return item.genres.includes(id)
        })
        res.json({
          data: value.sort((a, b) => a.id - b.id),
          status: 'success',
          message: ''
        })
      }
    }
  }
}

class Controller {
  async handelLike (req, res) {
    const { id } = req.body
    const elem = bd.find(elem => elem.id === id)
    if (elem) {
      bd = [...bd.filter(elem => elem.id !== id), { ...elem, isLike: !elem.isLike }]
      return res.json({
        status: 'success',
        data: { ...elem, isLike: !elem.isLike },
        message: ''
      })
    } else {
      return res.status(400).json({
        message: 'Not find',
        status: 'error',
        data: {}
      })
    }
  }
}

module.exports = {
  LikeController: new Controller(),
  GenreController: new GenreController()
}
