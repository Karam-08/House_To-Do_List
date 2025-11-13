import express from 'express'
import Task from '../models/Task.js'
const router = express.Router()

// INDEX — list + basic search
router.get('/', async (req, res) =>{
    const {search = '', priority = '', room = '', assignee = '', dueDate = '', notes = '', sort = 'newest', status = ''} = req.query;
    const q = {}
    if(search){
        const re  = new RegExp(search, 'i');
        q.$or = [
            {title:re},
            {room:re},
            {priority:re},
            {notes:re},
            {assignee:re}
        ]
    }

    if(priority) q.priority = new RegExp(`^${priority}$`, 'i');
    if(room) q.room = new RegExp(`^${room}$`, 'i');
    if(assignee) q.assignee = new RegExp(`^${assignee}$`, 'i')
    if(notes) q.notes = new RegExp(notes, 'i')
    if(dueDate) q.dueDate = dueDate
    if(status === 'open'){
        q.completed = false
    }else if(status === 'completed'){
        q.completed = true
    }

    // Object sorting logic
    let sortObj = {createdAt: -1}; // default sort by newest
    if(sort === 'dueAsc') sortObj = {dueDate: 1};
    else if(sort === 'dueDesc') sortObj = {dueDate: -1};
    else if(sort === 'priority') sortObj = {priority: 1};

    try{
        const tasks = await Task.find(q).sort(sortObj).lean()
        res.render('tasks/index', {tasks, search, priority, room, assignee, dueDate, notes, sort, status});
    }catch(err){
        console.error(err);
        res.status(500).send('Error fetching tasks');
    }
})

// NEW — show form
router.get('/new', (req, res) =>{
    res.render('tasks/new', {task: {}, errors: {}});
})

// CREATE — handle form
router.post('/', async (req, res) =>{
    try{
        const {title, room, priority, assignee, dueDate, notes} = req.body;
        const completed = req.body.completed === 'on' ? true : false;
        await Task.create({title, room, priority, assignee, dueDate, notes, completed})
        res.redirect('/tasks')
    }catch(err){
        if(err.name === 'ValidationError'){
            res.render('tasks/new', {task: req.body, errors: err.errors})
        }else{
            res.status(500).send('Server Error')
        }    
    }
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
    const task = await Task.findById(req.params.id).lean()
    if(!task) return res.status(404).send("Not Found")
    res.render('tasks/edit', {task, errors: {}})
})

// UPDATE
router.put('/:id', async (req, res) =>{
    const {title, room, priority, assignee, dueDate, notes} = req.body;

    const completed = req.body.completed === 'on'

    const task = await Task.findByIdAndUpdate(req.params.id, {title, room, priority, assignee, dueDate, notes, completed}, {new: true})
    if(!task) return res.status(404).send("Not Found")
    res.redirect(`/tasks/${task._id}`)
})

// DELETE
router.delete('/:id', async (req, res) =>{
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).send("Not Found")
    res.redirect('/tasks')    
})

// TOGGLE COMPLETED
router.post('/:id/toggle', async (req, res) => {
    try{
        const task = await Task.findById(req.params.id)
        if(!task) return res.status(404).send("Task Not Found")

        task.completed = !task.completed
        await task.save()

        res.redirect('/tasks')
    }catch(err){
        console.error(err)
        res.status(500).send('Error toggling task completion')
    }
})

export default router