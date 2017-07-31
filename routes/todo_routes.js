const express = require('express')
const todoRoutes = express.Router()
const authHelpers = require('../services/auth/auth_helpers')
const todoControllers = require('../controllers/todo_controller')

todoRoutes.get('/', todoControllers.index)
todoRoutes.post('/', todoControllers.loginRequired, todoControllers.create)
todoRoutes.get('/add', authHelpers.loginRequired, (req, res)=>{
    res.render('todo/todo-dd',{
        currentPage: 'add'
    })
})
todoRoutes.get('/:id', todoControllers.show)
todoRoutes.get('/:id/:edit', authHelpers.loginRequired, todoControllers.edit)
todoRoutes.put('/:id', authHelpers.loginRequired, todoControllers.update)
todoRoutes.delete('/:id', authHelpers.loginRequired,todoControllers.delete)

module.exports = todoRoutes;