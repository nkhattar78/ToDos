const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const PORT = 4000;

let Todo = require('./model/todo');

app.use(cors());
// Use bodyParser.urlencoded({extended:true}) when trying from postman and use bodyParser.json()) when trying from code with axios api
//app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

//mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true});
const connectionUrl = 'mongodb://nkhattar:Namaste@clusternk-shard-00-00.ai6zo.mongodb.net:27017,clusternk-shard-00-01.ai6zo.mongodb.net:27017,clusternk-shard-00-02.ai6zo.mongodb.net:27017/todos?ssl=true&replicaSet=atlas-4qz547-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const todoRoutes = express.Router();


todoRoutes.route('/').get(function(req,res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    })
})

todoRoutes.route('/:id').get(function(req,res) {
    let id = req.params.id;
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo) {
            res.status(404).send('Todo not found');
        } else {
            res.json(todo);
        }
    })
})

todoRoutes.route('/update/:id').post(function(req,res){
    console.log('todo id: ' + req.params.id);
        Todo.findById(req.params.id, function (err, todo) {
        if (!todo) {
            res.status(404).send('Todo not found');
        } else {
            todo.description = req.body.description;
            todo.owner = req.body.owner;
            todo.priority = req.body.priority;
            todo.comppletionStatus = req.body.comppletionStatus;

            todo.save().then(todo => {
                res.json('Todo updated');
            }).catch (err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

todoRoutes.route('/delete/:id').delete(function(req,res){
    console.log('todo id for deletion: ' + req.params.id);
        Todo.findById(req.params.id, function (err, todo) {
        if (!todo) {
            res.status(404).send('Todo not found');
        } else {
            todo.remove().then(todo => {
                res.json('Todo deleted successfully');
            }).catch (err => {
                res.status(400).send('Todo deletion failed');
            });
        }
    });
});


todoRoutes.route('/add').post(function(req, res) {    
    console.log('request body: ' + JSON.stringify(req.body));

    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


