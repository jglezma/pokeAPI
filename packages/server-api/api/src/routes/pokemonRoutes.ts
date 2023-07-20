/**
 * Default baseUrl for this endpoints
 * @url /api/pokemon
 */

import { Router } from "express";

import { savePokemonCaptured } from "../controllers/pokemonController";

const router = Router();

router.route("/").post(savePokemonCaptured);

export default router;
