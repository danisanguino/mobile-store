import dotenv from "dotenv";

type TConfig = {
  [key:string]: EnviromentConfig
};

type EnviromentConfig = {
  app: AppConfig
  db: DbConfig
};

type AppConfig = {
  PORT: string | number 
};

type DbConfig = {
  URI: string
} 

//PREGUNTAR POR QUÉ MARIA LO QUITÓ Y A MI NO
//FURULA ESTO
if (process.env.NODE_ENV === "production") {
  dotenv.config({path: ".env.production"})
} else {
  dotenv.config({path: ".env.development"})
};

// dotenv.config();

const ENV = process.env.NODE_ENV ?? "development";

const CONFIG: TConfig = {
    development: {
      app: {
        PORT: process.env.PORT || 4666
      },
      db: {
        URI: process.env.MONGODB_URI || "error to connect!"
      }
    },
    production: {
      app: {
        PORT: process.env.PORT || 8666
      },
      db: {
        URI: process.env.MONGODB_URI || "error to connect!"
      }
    } 
};

export default CONFIG[ENV]