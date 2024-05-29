const  express =  require('express');
const {createTask,getTask,updateTask} = require('../schemas/task.schema')
const ModelTasks = require('../model/tasks.model')


const router = express.Router()
const modelTasks = new ModelTasks();

router.get('/',async (req,res)=>{
    try {
        const answer = await modelTasks.getTasks()
        if (answer) {
            return res.status(200).json({ data: answer });
          } else {
            return res.status(404).json({ msg: "Task not found" });
          }
    } catch (error) {
        return res.status(500).json({msn:"Server error"})
    }
})
router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    const {error,data} = getTask.validate({id},{abortEarly:false})
    if(error)
        return res.status(401).json({msn:error})
    try {
      const answer= await modelTasks.getTask(id)
      if (answer) {
        return res.status(200).json({ data: answer });
      } else {
        return res.status(404).json({ msg: "Task not found" });
      }
    } catch (error) {
       return res.status(500).json({msn:"Server error"})
    }

})
router.post('/',async (req,res)=>{
    const data = req.body
    const {error,value} = createTask.validate(data,{abortEarly:false})
    if(error)
        return res.status(401).json({msn:error})  
    try {
        const answer= await modelTasks.insertTask(value)
        if (answer) {
          return res.status(200).json({ data: answer });
        } else {
          return res.status(404).json({ msg: "Task not found" });
        }
      } catch (error) {
         return res.status(500).json({msn:"Server error"})
      }
})
router.patch('/:id',async (req,res)=>{
    const {id} = req.params;
    const data= {...req.body,id}
    const {error,value} = updateTask.validate(data,{abortEarly:false})
    if(error)
        res.status(401).json({msn:error})  
    try {
         modelTasks.updateTask(id,value)
        return res.status(200).json({message: 'Task updated successfully' });
        
    } catch (error) {
         return res.status(500).json({msn:"Server error"})
    }
})
router.patch('/state/:id',async (req,res)=>{
    const {id} = req.params;
    const {error,data} = getTask.validate({id},{abortEarly:false})
    if(error)
        res.status(401).json({msn:error})  
    try {
        await modelTasks.changeStateTask(id)
        return res.status(200).json({message: 'Task updated successfully' });
        
    } catch (error) {
         return res.status(500).json({msn:"Server error"})
    }
})
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const {error,value} = getTask.validate({id},{abortEarly:false})
    if(error)
        res.status(401).json({msn:error})   
    
    try {
        modelTasks.deleteTaks(id)
       return res.status(200).json({message: 'Task updated successfully' });
   } catch (error) {
        return res.status(500).json({msn:"Server error"})
   }
})

module.exports = router;