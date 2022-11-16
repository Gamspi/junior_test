let bd = require('../bd/bd')
let users = require('../bd/usersBD')

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

class LikeController {
  async handelLike (req, res) {
    const { id, user: userId } = req.body
    console.log(userId)
    if (userId) {
      const user = users.find(user => user.id === userId)
      users = [...users.filter(user => user.id !== userId), { ...user, favorite: [...user.favorite, id] }]
      console.log(users)
    }

    const elem = bd.find(elem => elem.id === id)
    if (elem) {
      bd = [...bd.filter(elem => elem.id !== id), { ...elem, isLike: !elem.isLike }]
      return res.json({
        status: 'success',
        data: { ...elem, isLike: !elem.isLike, user: users.find(user => user.id === userId) },
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

class Authorization {
  async auth (req, res) {
    const { email, password } = req.body
    const user = users.find(user => user.email === email && user.password === password)
    if (user) {
      return res.status(200).json({
        status: 'success',
        data: { id: user.id },
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
  LikeController: new LikeController(),
  GenreController: new GenreController(),
  Authorization: new Authorization()
}
