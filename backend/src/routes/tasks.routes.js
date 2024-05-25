const  express =  require('express');
const {createTask,getTask,updateTask} = require('../schemas/task.schema')

const router = express.Router()

router.get('/',(req,res)=>{
    res.status(200).send("hi tasks... this es")
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
    const {error,value} = update.validate(data,{abortEarly:false})
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