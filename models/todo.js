const db = require('../db/config')

const Todo = {
    findAll: ()=>{
        return db.query('SELECT * FROM todo')
    },
    findById: (id)=>{
        return db.oneOrNone(`
        SELECT * FROM todo
        WHERE id = $1
        `, [id])
    },
    create: (todo, userid)=>{
        return db.one(`
        INSERT INTO todo
        (title, category, description, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [todo.title, todo.category, todo.description, userid])
    },
    update: (todo, id)=>{
        return db.one(`
        UPDATE todo SET
        title = $1,
        category = $2,
        description = $3
        WHERE id = $4
        RETURNING *
        `,[todo.title, todo.category, todo.description, id])
    },
    destroy: (id)=>{
        return db.one(`
        DELETE FROM todo
        WHERE id = $1
        `,[id])
    }
}

module.exports = Todo;