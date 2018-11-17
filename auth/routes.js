const { Router } = require('express')
const { toJWT } = require('./jwt')
const bcrypt = require('bcrypt');
const User = require('../users/model')
const auth = require('./middleware')

const router = new Router()

router.post('/tokens', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }
  else {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (!user) {
          res.status(400).send({
            message: 'User with that email does not exist'
          })
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            token: toJWT({ userId: user.id })
          })
        }
        else {
          res.status(400).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
  }
})

//secret-endpoint for testing
router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})

module.exports = router

