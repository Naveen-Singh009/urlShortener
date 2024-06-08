import mongoose from "mongoose";

async function connectToDB(url)
{
    return mongoose.connect(url)
}

export default connectToDB  ;