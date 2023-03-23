import mongoose from "mongoose";


export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((c) => {
    console.log(`Database Connected with ${c.connection.host} `);
    }).catch((err) => {
    console.log(err);
    });
}