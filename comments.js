// Create web server
const express = require('express');
const app = express();
// Use body-parser to parse request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Get database connection
const db = require('./db');
// Get comment model
const Comment = require('./comment');
// Get all comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// Get one comment
app.get('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findOne({
            _id: req.params.id
        });
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// Create new comment
app.post('/comments', async (req, res) => {
    try {
        const comment = new Comment({
            name: req.body.name,
            comment: req.body.comment,
            date: req.body.date
        });
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// Update a comment
app.put('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findOne({
            _id: req.params.id
        });
        comment.name = req.body.name;
        comment.comment = req.body.comment;
        comment.date = req.body.date;
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// Delete a comment
app.delete('/comments/:id', async (req, res) => {
    try {
        await Comment.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// Listen on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));