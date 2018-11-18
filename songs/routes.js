const { Router } = require('express')
// const Playlist = require('../playlists/model')
const Song = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

// => POST /playlists: A user should be able to create a playlist 
//(with just a name)
router.post('/playlists/:id/songs', auth, (req, res, next) => {
  console.log(req.body)
  if (!req.body.title && !req.body.artist && !req.body.album) {
    return res.status(404).send({
      message: `Add a song title, artist and album to create new song`
    })
  }
  

  Song
    .create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      playlistId: req.params.id
    })
    .then(song => {
      
      return res.status(201).send(song)
    })
    .catch(error => next(error))
})

module.exports = router