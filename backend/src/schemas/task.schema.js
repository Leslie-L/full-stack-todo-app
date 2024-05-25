const Joi = require('joi');

const id = Joi.number()
const task = Joi.string().min(1);
const finished = Joi.boolean();
const date = Joi.date();

const createTask = Joi.object({
    task: task.required(),
    date: date.required(),
})
const updateTask = Joi.object({
    id:id.required(),
    task: task,
    date: date,
    finished:finished  
})
const getTask = Joi.object({
    id:id.required()
})

module.exports={
    createTask,
    updateTask,
    getTask
}
   


