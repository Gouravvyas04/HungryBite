import mongoose from "mongoose";

export const connectDB =async() =>{ 
    await mongoose.connect('mongodb+srv://gouravvyas542:nhPp3YIZD9B525up@cluster0.23dvd.mongodb.net/HurryBite').then(() => {
        console.log("DB Connected");
    })
}