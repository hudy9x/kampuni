import { NextFunction, Request, Response } from 'express';
import { extractToken, generateRefreshToken, generateToken, verifyRefreshToken, verifyToken } from '../lib/jwt';
import { mdMemberBelongToProject, mdUserFindEmail } from '@shared/models';
import { User } from '@prisma/client';
import { AuthRequest, JWTPayload } from '../types';

export const beProjectMemberMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.authen;
  const { body, query } = req;
  const projectId = query.projectId || body.projectId;

  if (!projectId) {
    return res.json({
      status: 400,
      error: `You must provide 'projectId' in request: ${req.url}`
    });
  }

  const result = await mdMemberBelongToProject(id, projectId);

  if (!result) {
    return res.json({
      status: 400,
      error: `You are not member of project ${projectId}`
    });
  }

  console.log('Passed !, you are project member')

  // console.log('==================');
  // console.log('uid: ', id);
  // console.log('projectId:', projectId);
  // console.log('is belong to project', result);

  next();
};
