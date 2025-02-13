import mongoose from "mongoose";

let initiazed = false;

const connect = async () => {
   mongoose.set('strictQuery', true);

   if(initiazed){
    console.log('connected to mongodb')
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI,{
        dbName:'little-blog',
        useNewUrlParser: true,
        useUnifiedTopology:true,
    });
    console.log('Connected to Mongodb');
    initiazed = true;
  } catch (error) {
    console.log('error connecting to db', error)
  }
}

export default connect;