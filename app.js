const Express = require('Express')
const app = Express()
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()

// connect mongo db
connectDB()

// Body Parser
app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())

// cors
app.use(cors({
  origin: process.env.CORS
}))

app.use('/test', (_,res) => res.send('working fine!'))

// api routes
app.use('/', require('./routes/route'))

// Server Setup
app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}`)
})
