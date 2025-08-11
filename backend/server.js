import express from "express"
import Dotenv from "dotenv"
import cors from "cors"
import mongoDB from "./config/db.js"
import authRoute from "./routes/authRoutes.js"
import issueRoute from "./routes/issueRoutes.js"

const app = express()
const port = 3000

Dotenv.config()
mongoDB()
app.use(cors())
app.use(express.json())

app.use("/auth",authRoute)
app.use("/issue",issueRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
