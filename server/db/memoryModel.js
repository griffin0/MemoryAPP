import  mongoose from "mongoose"




const MemoSchema = mongoose.Schema({
    title: {
    type:String,
    required: true
},
    content: {
        type:String,
        required: true

    },
    creator: {
        type:String,
        required:true

    },
    Image: {
        type:String,
        
    },
    createdAT: {
        type: Date,
        default: new Date()
    }
})

const Memory = mongoose.model('memo', MemoSchema)

export default Memory
