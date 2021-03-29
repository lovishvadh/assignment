import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    token: String,
    subscribedChannels: [Object]
}, { 
    timestamps: 
    { 
        createdAt: "createdAt", 
        updatedAt: "updatedAt" 
    } 
});

export default mongoose.model('user', userSchema);
