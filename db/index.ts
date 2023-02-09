import "reflect-metadata";
import { Connection, getConnection, createConnection } from "typeorm";
import { User, UserAuth } from "./entity";

type TConnectType = "mysql" | "mariadb";

const type = process.env?.DATABASE_TYPE as TConnectType;
const port = Number(process.env?.DATABASE_PORT);
const host = process.env?.DATABASE_HOST;
const username = process.env?.DATABASE_USERNAME;
const password = process.env?.DATABASE_PASSWORD;
const database = process.env?.DATABASE_NAME;

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        console.log(error);
      }

      return await createConnection({
        type,
        host,
        port,
        username,
        password,
        database,
        entities: [User, UserAuth],
        synchronize: false,
        logging: true
      });
    })();
  }

  return connectionReadyPromise;
};
