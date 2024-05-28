const db = require('./db');

class ModelTasks {
    constructor(){
    }
    async getTasks(){
        const tasks  = await db.query('SELECT * FROM tasks')
        return tasks.rows;
    }
    async getTask(id){
        const task = await db.query('SELECT * FROM tasks WHERE id=$1',[id])
        return task.rows[0]
    }
    async insertTask({user,task,date}){
        const insert = await db.query('INSERT INTO tasks(user, task,finished,date) VALUES ($1,$2,$3,$4) RETURNING *',[user,task,false,date ])
        return insert.rows[0]
    }
}
module.exports = ModelTasks