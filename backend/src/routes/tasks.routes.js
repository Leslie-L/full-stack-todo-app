const  express =  require('express');


const router = express.Router()

router.get('/',(req,res)=>{
    res.status(200).send("hi tasks... this es")
})
router.get('/:id',(req,res)=>{
    const {id} = req.query;
    res.status(200).send(id )
})

module.exports = router;