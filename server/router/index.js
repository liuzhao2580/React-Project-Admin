const express= require('express')
const Router = express.Router()


Router.get('/',(req,res) => {
    res.send({
        msg: 'hello!'
    })
})

module.exports = Router