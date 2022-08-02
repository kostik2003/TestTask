const express = require('express')
const cors = require('cors')
const router = require('./routes/index')

const PORT = 3001

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try{
        app.listen(PORT, () => {
            console.log("server started on port 3001")
        })
    }catch (e) {
        console.log("message error", e)
    }
}
start() 

//http://localhost:3000/api/user