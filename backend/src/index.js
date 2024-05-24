const  express =  require('express');
const dotenv = require('dotenv');
const routerApi  = require('./routes/index')


dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

routerApi(app);

app.get('/', (req, res) => {
  res.send('Hello World! xD!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})