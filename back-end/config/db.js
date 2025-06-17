import "dotenv/config"; 
import mongoose from "mongoose";

const { MONGO_URL } = process.env;

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Conexão com banco de dados estabelecida.');
    } catch (error) {
        console.error('Conexão com o banco de dados falhou:', error.message);
    }
};

export default connectDb;