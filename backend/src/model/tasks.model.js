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
    async insertTask({id,finished,task,date}){
        const insert = await db.query('INSERT INTO tasks("user", taks,finished,date) VALUES ($1,$2,$3,$4) RETURNING *',[id,task,finished,date ])
        return insert.rows[0]
    }
    async updateTask(id,data){
        await db.query('UPDATE tasks SET task = $1, finished = $2 WHERE id = $3',[data.task,data.finished,id])
    }
    async changeStateTask(id){
        await db.query('UPDATE tasks SET finished = NOT finished WHERE id = $1',[id])
    }
    async deleteTaks(id){
        await db.query('DELETE FROM tasks WHERE id=$1;',[id])
    }
}
module.exports = ModelTasks