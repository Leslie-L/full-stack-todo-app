const  express =  require('express');
const {createTask,getTask,updateTask} = require('../schemas/task.schema')
const ModelTasks = require('../model/tasks.model')


const router = express.Router()
const modelTasks = new ModelTasks();

router.get('/',async (req,res)=>{
    try {
        const answer = await modelTasks.getTasks()
        res.status(200).json({data:answer})
    } catch (error) {
        res.status(500).json({msn:"Server error"})
    }
})
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const {error,data} = getTask.validate({id},{abortEarly:false})
    if(error)
        res.status(401).json({msn:error})   
    res.status(200).send(id )
})
router.post('/',(req,res)=>{
    const data = req.body
    console.log("Un post")
    const {error,value} = createTask.validate(data,{abortEarly:false})
    if(error)
        return res.status(401).json({msn:error})  

    res.status(200).json({value})
})
router.patch('/:id',(req,res)=>{
    const {id} = req.params;
    const data= {...req.body,id}
    const {error,value} = updateTask.validate(data,{abortEarly:false})
    if(error)
        res.status(401).json({msn:error})  

    res.status(200).send("update a task")
})
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const {error,value} = getTask.validate({id},{abortEarly:false})
    if(error)
        res.status(401).json({msn:error})   
    
    res.status(200).send("delete a task")
})

module.exports = router;