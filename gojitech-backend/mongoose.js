import mongoose from 'mongoose';

//Mongoose configuration
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, ()=>{console.log("db connected")});