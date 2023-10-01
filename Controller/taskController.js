const mongoose = require("mongoose")
const taskModel = require("../models/TaskModel");


//create a task, to post
const createTask = async (req,res)=>{
    try {
        const {title,description} = req.body;
        console.log(title,description,"kkkk")
        const task = await taskModel.create({ title, description });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({message:error.message});
        console.log(error,"error")
    }


}

const getTasks = async (req, res)=>{
    try {
        const tasks = await taskModel.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
    
}

const getSingleTask = async (req, res)=>{
    try {
      const {id} = req.params;
      console.log(id,"diiii")
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid id"});
      }
      const singleTask = await taskModel.findById(id);
      res.status(200).json(singleTask)
    } catch (error) {
        res.status(400).json({message:error.message});
    }
    
}

const updateSingleTask = async (req, res)=>{
    try {
      const {id} = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid id"});
      }
      const singleUpdateTask = await taskModel.findByIdAndUpdate({
        _id:id,
      },
      {
         ...req.body,
      });
      res.status(200).json(singleUpdateTask)
    } catch (error) {
        res.status(400).json({error:error.message});
    }
    
}

const deleteSingleTask = async (req, res)=>{
    try {
      const {id} = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid id"});
      }
      const deleteSingleTask = await taskModel.findByIdAndDelete(id);
      res.status(200).json(deleteSingleTask)
    } catch (error) {
        res.status(400).json({error:error.message});
    }
    
}

module.exports = {createTask,getTasks,getSingleTask,updateSingleTask,deleteSingleTask}

