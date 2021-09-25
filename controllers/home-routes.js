const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, Comment, User } = require('../models');

//homepage route 
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            }

        ]
    })
    .then(dbPostData => {
        //serialize the data
        const posts = dbPostData.map(post => post.get({ plain: true }));
        //send data to template
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//single-post route
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            }

        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        //serialize the data
        const post = dbPostData.get({ plain: true });
        
        //send data to render through template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/login', (req, res) => {
    //if user is already logged in they cannot press the login button again
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
}) 

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  
});


module.exports = router;