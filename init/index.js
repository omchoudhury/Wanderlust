const mongoose =require('mongoose');
const initData= require("./data.js");
const Listing =require("../models/listing.js");

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";


main().then(() => {
   console.log("Connected to MongoDB");
}).catch((err) => {
   console.error("Error connecting to MongoDB:", err);
});
async function main() {
   await mongoose.connect(MONGO_URL);
}


const initDB =async () => {
 await Listing.deleteMany({});
 initData.data = initData.data.map((obj) => {
   return { ...obj, owner: "6a1d7d001e4109808faec2fd" }; // Replace with actual user ID
 });
  await Listing.insertMany(initData.data);
  console.log("data was initilize")
};

initDB();