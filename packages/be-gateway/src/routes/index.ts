import { Router } from 'express';
import authRouter from './auth';
import orgRouter from './organization';
import projectRouter from './project';
import projectMemberRouter from './member';
import taskRouter from "./task";

const router = Router();

// middlewares
// router.use([])
router.use(authRouter);
router.use(orgRouter);
router.use(projectRouter);
router.use(projectMemberRouter);
router.use(taskRouter);

export default router;
