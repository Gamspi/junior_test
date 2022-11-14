const express = require('express')
const cors = require('cors')
const PORT = 5000
const router = require('./routes/index')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => console.log('server started =)'))
