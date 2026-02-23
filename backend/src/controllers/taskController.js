const express = require('express');
const taskModel = require('../models/task.model');

exports.createTask = async (req, res) => {
    const { title, content } = req.body;
    if (!title) {
        res.status(404).send({
            message: "this filled is required "
        })
    }
    try {
        console.log("req", title, content);
        await taskModel.create({ title, content });
        res.send({
            message: "task created successfully!"
        });
    } catch (error) {
        res.status(500).send({
            error: "Failed to create task",
            details: error.message
        });
    }
}
exports.featchAllTaks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.json({
            Message: "task fetch successfully !",
            tasks
        })
    } catch (error) {
        res.status(500).send({
            error: "failed",
            details: error.message
        })
    }
}
exports.getSingleByIdTask = async (req, res) => {
    const noteId = req.params.id;
    try {
        const notedata = await taskModel.findById(noteId)
        if (!notedata) {
            return res.status(404).send({
                message: "note data not found !",
            })
        }
        res.send({
            message: `successfully fetch this ${noteId} data`,
            data: notedata,
        });
    } catch (error) {
        res.status(500).send({
            error: "failed",
            details: error.message
        })
    }
}
exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    console.log("update data", taskId);
    const { title, content } = req.body;
    if (!title) {
        return res.status(404).send({
            message: "title is required"
        });
    }
    try {
        const updateTask = await taskModel.findOneAndUpdate(
            { _id: taskId },
            { title: title, content: content },
        );
        if (!updateTask) {
            return res.status(404).send({
                message: "task not found !"
            });
        }
        res.send({
            message: "note updated successfully!"
        });
    } catch (error) {
        res.status(500).send({
            error: "failed",
            details: error.message
        });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const noteId = req.params.id;
        console.log("note id", noteId);
        await taskModel.findOneAndDelete({
            _id: noteId
        })
        res.send({
            messege: "note delete succesfully !"
        })
    } catch (error) {
        res.status(500).send({
            error: "failed",
            details: error.message
        })
    }
}

exports.markascompleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskModel.findByIdAndUpdate(id, { status: "Complete" }, { new: true })
        if (!task) {
            res.status(404).json({
                message: "task not found"
            })
        }
        res.status(200).json({
            message: "task complete "
        })
    } catch (error) {
        res.status(500).send({
            error: "failed to task complete",
            details: error.message
        })
    }
}

