import express from "express";
import { authRouter } from './auth/index.js';
import { moviesRouter } from './movies/index.js';

const router = express.Router();


router.use(authRouter);
router.use(moviesRouter);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.text());

export default router;
