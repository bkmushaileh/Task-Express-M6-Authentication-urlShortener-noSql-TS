import express from "express";

const router = express.Router();

import { signup, signin, getUsers } from "./users.controllers";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getUsers);

export default router;
