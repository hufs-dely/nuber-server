import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    database: "nuber",
    synchronize: true,
    logging: true,
    entities: ["entities/**/*.*"],//모델파일이 들어갈 폴더 위치
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  };

export default connectionOptions;