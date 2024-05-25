const  express =  require('express');


const router = express.Router()

router.get('/',(req,res)=>{
    res.status(200).send("hi tasks... this es")
})
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    res.status(200).send(id )
})
router.post('/',(req,res)=>{
    const data= req.body
    res.status(200).send("create a new task")
})
router.patch('/:id',(req,res)=>{
    const {id} = req.params;
    const data= req.body

    res.status(200).send("update a task")
})
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    res.status(200).send("delete a task")
})

module.exports = router;