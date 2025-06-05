const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongoose api here')
    .then(function () {
        app.listen(3000, function() {
            console.log('Server running on port 3000')
        });
    })

const taskSchema = new mongooseSchema({
    title: {type: string, required: true},
    completed: {type: Boolean, default: false}},
    {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

