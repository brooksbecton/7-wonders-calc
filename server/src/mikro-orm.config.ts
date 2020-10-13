import { Table } from "./entitites/Table";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entitites/User";
import { Player } from "./entitites/Player";

export const microConfig: Parameters<typeof MikroORM.init>[0] = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Table, User, Player],
  dbName: "7Wonders",
  type: "postgresql",
  debug: !__prod__,
  password: process.env.DB_PASS,
};

export default microConfig;
