import express from 'express'
import Task from '../models/Task.js'
const router = express.Router()

// INDEX — list + basic search
router.get('/', async (req, res) =>{
    const {search = '', cohort = ''} = req.query;
    const q = {}
    if(search){
        const re  = new RegExp(search, 'i');

        q.$or = [
            {title:re},
            {room:re},
            {priority:re},
            {completed:re}
        ]
        if(assignee) q.assignee = assignee
        if(dueDate) q.dueDate = dueDate
        if(notes) q.notes = notes
    }
    const tasks = await Task.find(q).sort({createdAt: -1}).lean()
    res.render('tasks/index', {tasks, search, assignee, dueDate, notes})
})

// NEW — show form
router.get('/new', (req, res) =>{
    res.render('tasks/new')
})

// CREATE — handle form
router.post('/', async (req, res) =>{
    const {title, room, priority, assignee, dueDate, notes, completed} = req.body;
    await Task.create({title, room, priority, assignee, dueDate, notes, completed})
    res.redirect('/tasks')
})

// SHOW
router.get('/:id', async (req, res) =>{
    const task = await Task.findById(req.params.id).lean()
    if(!task) return res.status(404).send('Not found')
    task.createdAt = task.createdAt || new Date()
    res.render('tasks/show', {task});
})

// EDIT — form
router.get('/:id/edit', async (req, res) =>{
    
})

// UPDATE
router.put('/:id', async (req, res) =>{
    
})

// DELETE
router.delete('/:id', async (req, res) =>{
    
})

export default router