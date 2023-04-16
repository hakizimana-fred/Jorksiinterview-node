import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        // 
        await mongoose.connect('mongodb+srv://fred:fred@cluster0.bblz2.mongodb.net/interview-api')
        console.log('DB connected')
    }catch(e) {
        process.exit(1)
    }
}
