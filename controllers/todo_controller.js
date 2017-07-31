const Todo = require('../models/todo')

const todoController= {
    index: (req, res)=>{
        Todo.findAll().then(todo=>{
            res.render('todo/todo-index',{
                currentPage: 'index',
                message: 'ok',
                data: todo,
            })
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    },
    show: (req, res)=>{
        Todo.findById(req.params.id).then(todo=>{
            res.render('todo/todo-single',{
                currentPage: 'show',
                message: 'ok',
                data: todo,
            })
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    },
    create: (req, res)=>{
        Todo.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description
        }, req.user.id).then(()=>{
            res.redirect('/todo')
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    },
    update: (req, res)=>{
        Todo.update({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description
        }, req.user.id).then((todo)=>{
            res.redirect(`/todo/${req.params.id}`)
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    },
    edit: (req, res)=>{
        Todo.findById(req.params.id).then(todo=>{
            res.render('/todo/todo-single-edit', {
                currentPage: 'edit',
                data: todo
            })
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    },
    delete: (req, res)=>{
        Todo.destroy(req.params.id).then(()=>{
            res.redirect('/todo')
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    }
}

module.exports = todoController;