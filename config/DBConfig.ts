import mongoose, {ConnectOptions} from "mongoose";

const connect = () => {
    mongoose.connect(process.env.CONNECTION_URL as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
        .then(() => console.log('Connected To DB'))
        .catch((error: any) => {
            console.log(error.message);
            process.exit(1);
        });
}

export default connect;

