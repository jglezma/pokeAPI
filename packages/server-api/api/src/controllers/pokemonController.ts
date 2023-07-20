import type { Request, Response } from "express";
import PokemonModel from "../models/PokemonModel";
import servers from "../../app";

export const savePokemonCaptured = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, pokemonId } = req.body as {
      username: string;
      pokemonId: number;
    };

    servers.io.emit(`capturing-pokemon-${pokemonId}-${username}`, true);

    // Save pokemon relation with the username
    await new PokemonModel({
      username,
      pokemonId,
    }).save();

    // Create socket event to send to the user the alert notification
    // about the pokemon was captured
    setTimeout(() => {
      servers.io.emit(`captured-pokemon-${username}`, pokemonId);
    }, 3000);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Unexpected error" });
  }
};
