import mongoose from "mongoose";
import colors from "colors";
const conDB = async () => {
  try {
    const connecti = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `CONNECTED TO DATABASE ${connecti.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`ERROR IN CONNECTING MONGO DB DATABASE ${error}`.bgRed.white);
  }
};
export default conDB;
