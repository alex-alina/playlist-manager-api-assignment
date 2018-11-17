const { Router } = require('express')
const bcrypt = require('bcrypt');
const User = require('./model')
const router = new Router()

router.post('/users', (req, res, next) => {
  if (req.body.password !== req.body.password_confirmation) {
    return res.status(422).send({
      message: `Passwords do not match`
    })
  }

  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  }

  User
    .create(user)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `Could not create user`
        })
      }
      return res.status(201).send({ email: user.email })
    })
    .catch(error => next(error))
})

module.exports = router