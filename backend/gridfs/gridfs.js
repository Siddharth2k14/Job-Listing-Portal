import mongoose from "mongoose";
import Grid from "gridfs-stream";

let gfs;
let gridfsBucket;

export const connectGridFS = () => {
  const conn = mongoose.connection;

  conn.once("open", () => {
    // Initialize GridFS stream
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads"
    });

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");

    console.log("✅ GridFS initialized");
  });
};

export { gfs, gridfsBucket };
