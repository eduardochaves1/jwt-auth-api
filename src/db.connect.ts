import mongoose from "mongoose";

const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbDomain = process.env.MONGODB_DOMAIN;
const dbName = process.env.MONGODB_DATABASE;

const mongodbConnection = async () => {
  try {
    await mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbDomain}/${dbName}?authSource=admin`)
    return console.info('Successfully Connected to MongoDB at ' + dbName)
  } catch (error) {
    return console.error('Error While Connecting MongoDB: ', error)
  }
}

export default mongodbConnection;
