import express from "express";

const router = express.Router();

import { shorten, redirect, deleteUrl } from "./urls.controllers";
import { authorization } from "../../middlewares/authorization";

router.post("/shorten", authorization, shorten);
router.get("/:code", redirect);
router.delete("/:code", authorization, deleteUrl);

export default router;
