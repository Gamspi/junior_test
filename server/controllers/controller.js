let bd = require('../bd/bd')
let users = require('../bd/usersBD')
const DELAY = 500

class GenreController {
  async filter (req, res) {
    setTimeout(() => {
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
    }, DELAY)
  }
}

class LikeController {
  async handelLike (req, res) {
    setTimeout(() => {
      const { id, user: userId } = req.body
      console.log(userId)
      const elem = bd.find(elem => elem.id === id)
      if (elem) {
        if (userId) {
          const user = users.find(user => user.id === userId)
          if (!elem.isLike) {
            users = [...users.filter(user => user.id !== userId), { ...user, favorite: [...user.favorite, id] }]
          } else {
            users = [...users.filter(user => user.id !== userId), {
              ...user,
              favorite: [...user.favorite.filter(f => f !== id)]
            }]
          }
        }

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
    }, DELAY)
  }
}

class Authorization {
  async auth (req, res) {
    setTimeout(() => {
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
    }, 500)
  }
}

class Filter {
  async filter (req, res) {
    setTimeout(() => {
      const { isFree, isFavorite, durationMin, durationMax, category, userId } = req.body
      console.log({ isFree, isFavorite, durationMin, durationMax, category, userId })
      let resolve = bd
      if (category && category.toLowerCase() !== 'all categories') {
        resolve = resolve.filter((item) => {
          return item.genres.includes(category.toLowerCase())
        })
      }
      if (isFavorite && userId) {
        const user = users.find(user => user.id === userId)
        if (user) {
          resolve = resolve.filter((item) => {
            return user.favorite.includes(item.id)
          })
        }
      }
      res.status(200).json({
        status: 'success',
        data: resolve,
        message: ''
      })
    }, DELAY)
  }
}

class Search {
  async find ({ body: { value } }, res) {
    console.log({ value })
    setTimeout(() => {
      if (value) {
        res.json({
          status: 'success',
          data: `Ты написал "${value}", что это значит?`,
          message: ''
        })
      } else {
        res.status(400).json(
          {
            status: 'error',
            data: null,
            message: 'Ты забыл мне написать =('
          }
        )
      }
    }, DELAY)
  }
}

module.exports = {
  LikeController: new LikeController(),
  GenreController: new GenreController(),
  Authorization: new Authorization(),
  Filter: new Filter(),
  Search: new Search()
}
