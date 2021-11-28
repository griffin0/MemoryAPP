import express from 'express'
import mongoose from 'mongoose'

import Memory from '../db/memoryModel.js'

const router = express.Router()


//get all memories from db
router.get('/', async (req,res) => {
    try {
        const memories = await Memory.find()

        res.status(200).json(memories)
        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

//get single memories from db
router.get('/:id', async (req, res) => {

    try {
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({message:'No memory'})

        const memory = await Memory.findById(id)
        if(!memory) return

        res.status(200).json(memory)
    } catch (error) {
        res.status(404).json({message: 'Memory not found'})
    }
    
})

//Create a memory
router.post('/', async (req, res) => {
    try {
        const memory = req.body

        const createdMemory = await Memory.create(memory)

        res.status(201).json(createdMemory)
    } catch (error) {
        
        res.json({message:'Create memory failed'}) 
        
    }
})

//Update a memory
router.put('/:id', async (req,res) => {
    try {

        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id))
        res.status(200).json({message:'Memory is not Valid'})

        const {title,content,creator,image } = req.body

        const updatedMemory = await Memory.findByIdAndUpdate(id, {title,content,creator,image, _id:id}, {new:true})

        res.status(200).json(updatedMemory)

    } catch (error) {
        console.log(error.message) 
        res.json({message:'Update Failed'})
        
    }
})


//Delete a Memory
router.delete('/:id', async (req,res) => {
    
    try {
        
        const {id} =req.params

        if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({message:'Memory is not Valid'})

        await Memory.findByIdAndDelete(id)
        res.status(200).json({message:'Memory has been Deleted'})

    } catch (error) {

        console.log(error.message)
        res.json({message:'Memory Delete Failed'}) 
        
    }
})


export default router