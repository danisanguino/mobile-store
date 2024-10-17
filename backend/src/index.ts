import appExpress from "./server";
import config from "./config/config";
import connect from "./BBDD/db";

const PORT = config.app.PORT;


const startServer = async () => {
    try {
        await connect(); 
        appExpress.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} and conected at mongoDB`);
        });
    } catch (error) {
        console.error("Error connecting to the database or starting the server:", error);
    }
};

startServer ();
