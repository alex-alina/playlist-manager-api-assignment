const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlist = require('../playlists/model')

const Song = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    field: 'song_title',
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    field: 'artist_name',
    allowNull: false
  },
  album: {
    type: Sequelize.STRING,
    field: 'album_title',
    allowNull: false
  },
  playlistId: {
    type: Sequelize.INTEGER,
    field: 'playlist_id'
  },
}, {
    timestamps: false,
    tableName: 'songs'
  })

 

module.exports = Song