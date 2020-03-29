const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');

router.post('/create', (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        username: req.body.username,
        password: hash,
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: "User successfully created.",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });


    })
});

router.get('/all', (req, res, next) => {
  User.find().then( users => {
    res.status(200).json({
      message: users.length.toString() + " users fetched!",
      users: users
    });
  })
    .catch(err => {
        console.log(error);
    });

});


router.get('/:id', (req, res, next) => {
  User.find({ staffId: req.params.id }).then( user => {
    res.status(200).json({
      message: "User fetched!",
      user: user
    });
  })
    .catch(err => {
      console.log(err);
    });

});


router.delete("/delete/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "User deleted!" });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({username: req.body.username.toLowerCase()})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "No such user"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Wrong Password"
        });
      }
       const token = jwt.sign(
         {username: fetchedUser.username},
         'server_secret',
         {expiresIn: "1h"}
         );
      res.status(200).json({
        token: token,
        id: fetchedUser._id,
      })
    })
    .catch(err => {
      res.status(401).json({
        message: err
      });
    })
});



module.exports = router;
