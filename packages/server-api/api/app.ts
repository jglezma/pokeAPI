import express, { type Express } from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { join } from "path";
import "./database";

// routes
import pokemonRoutes from "./src/routes/pokemonRoutes";

// Initializations
const app: Express = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "../../web-client/build")));

// routes
app.use("/api/pokemon", pokemonRoutes);

const servers = {
  server,
  io,
  app,
};

export default servers;
