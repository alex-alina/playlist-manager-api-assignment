## Playlist Manager API - Homework Project

## Description
The project's goal was to build a basic API to manage users' playlists with different songs, stored in a postgres database and deployed on Heroku.
The API includes authorization and all data is scoped to the user doing the request.

### Endpoints: 

##### Authentication

  * A user can sign up by posting `email`, `password`, and `password_confirmation` to `/users`
  * A user can sign in by posting to `/tokens` and get a response `{ token: "<JWT>" }`
  * A user can authenticate using an `Authorization` header with a `Bearer <JWT>`

##### Playlists

  * `POST /playlists`: A user should be able to create a playlist (with just a name)
  * `GET /playlists`: A user should be able to retrieve all their playlists
  * `GET /playlists/:id`: A user should be able to get a single one of their playlists, with all the songs on it (but no others).
  * `DELETE /playlists/:id`: A user may delete their playlists, and all songs on it.

##### Songs

  * `POST /playlists/:id/songs`: A user can add songs to their playlists. A song has a title, artist and album to which it belongs. A song can only be on one playlist.

## Tech stack

* JavaScript
* Express
* Sequelize
* PostgreSQL 

## Demo

Using HTTPie from the Terminal:
```bash
http POST https://fathomless-caverns-70194.herokuapp.com/users email="mary@gmail.com" password="12345" password_confirmation="12345"
http POST https://fathomless-caverns-70194.herokuapp.com/tokens email="mary@gmail.com" password="12345"
http POST https://fathomless-caverns-70194.herokuapp.com/playlists Authorization:"Bearer <jwt>" name="Mary's Playlist
```

## Setup

* You need a working Postgres database that is preferrably empty and running 
* Install the dependencies using `yarn install`
* Start the server using `nodemon .`
* Access enpoints with HTTPie commands on `localhost:4000`


## License
MIT Licence - Copyright &copy; 2018 - Alina Rusu
