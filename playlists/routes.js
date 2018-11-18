const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

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

router.get('/playlists', auth, (req, res, next) => {
  Playlist
    .findAll({
      where: {
        userId: req.user.id
      }
    })
    .then(playlists => {
      if (!playlists || playlists.length === 0) {
        return res.status(404).send({
          message: `No playlists here`
        })
      }
      return res.send(playlists)
    })
    .catch(error => next(error))
})

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