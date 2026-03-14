import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import notesRouter from './routes/notes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 10000

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://codemesttask.vercel.app'
  ]
}))

app.use(express.json())
app.use('/notes', notesRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Research Notes API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})