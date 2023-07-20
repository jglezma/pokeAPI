import mongoose from "mongoose";
mongoose.set('strictQuery', false);


mongoose.connect('mongodb://127.0.0.1:27017/bgspokemon');

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(">> DB is connected");
});

export default mongoose;
