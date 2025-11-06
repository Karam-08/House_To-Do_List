import express from 'express'
import Task from '../models/Task.js'
const router = express.Router()

router.get('/', async (req, res) =>{

})

router.get('/new', (req, res) =>{
    res.render('tasks/new')
})