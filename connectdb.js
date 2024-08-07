const mongoose=require("mongoose");

const connectdb=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONGO_URL);
        if(connection){
            console.log("Connected to DB");
        }
    } catch (error) {
        console.log(error.message);
        return ;
    }
}

module.exports={connectdb};