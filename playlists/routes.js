const { Router } = require('express')
const Playlist = require('./model')
// const User = require('../users/model')
const auth = require('../auth/middleware')


const router = new Router()

// => POST /playlists: A user should be able to create a playlist 
//(with just a name)
router.post('/playlists', auth, (req, res, next) => {
  if (!req.body.name) {
    return res.status(404).send({
      message: `Please add a playlist name to create new playlist`
    })
  }
  Playlist
    .create({
      name: req.body.name,
      userId: req.user.id
    })
    .then(playlist => {
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})

// => GET /playlists: A user should be able to retrieve all 
//their playlists

router.get('/playlists', auth, (req, res, next) => {
  Playlist
    .findAll({
      where: {
        userId: req.user.id
      }
    })
    .then(playlists => {
      res.send({ playlists })
    })
    .catch(error => next(error))
})
//=> GET /playlists/:id: A user should be able to get a single one 
//of their playlists, with all the songs on it (but no others).
router.get('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      }
    })
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.getSongs()
        .then((songs) => res.send(
          {
            id: playlist.id,
            userId: playlist.userId,
            name: playlist.name,
            songs: songs
          })
        )
    })
    .catch(error => next(error))
})



// => DELETE /playlists/:id: A user may delete their playlists, 
//and all songs on it.
router.delete('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.send({
          message: `Playlist was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router