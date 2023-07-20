import "dotenv/config";
import servers from "./app";
import "./src/events/pokemonEvents";

const PORT = Number(process.env.PORT) || 3001;

/**
 * Intialize the server using an IIFE (https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
 */
(() => {
  try {
    servers.server.listen(PORT);
    console.log(`>> Server on port ${PORT}`);
  } catch (error) {
    console.log(">> Error to start the server");
    console.log(error);
  }
})();
