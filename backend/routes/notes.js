import express from 'express'
import { supabase } from '../supabaseClient.js'

const router = express.Router()

// POST /notes — Add a new note
router.post('/', async (req, res) => {
  const { title, description, tag } = req.body
  if (!title) return res.status(400).json({ error: 'Title is required' })

  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, description, tag }])
    .select()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data[0])
})

// GET /notes — Retrieve all notes
// GET /notes?tag=AI — Retrieve notes filtered by tag
router.get('/', async (req, res) => {
  const { tag } = req.query

  let query = supabase.from('notes').select('*').order('created_at', { ascending: false })
  if (tag) query = query.eq('tag', tag)

  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

export default router