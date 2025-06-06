const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect('mongodb+srv://abenezeradev:sBAe2Af1kYsSvvvm@cluster0.hugaqjz.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0')
    .then(function () {
        app.listen(3000, function() {
            console.log('Server running on port 3000')
        });
    })

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, default: false}},
    {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});
