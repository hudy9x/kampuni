import { Response } from "express";
import { HttpStatus, ErrorResponseType } from "@shared/types"
import { Status_Setting } from "@prisma/client"
import { RequestAuth, app } from "../main";
import { mdStatusSettingAdd, mdStatusSettingGetAll, mdStatusSettingDel } from "@shared/models";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

app.post('/api/status-setting', ClerkExpressWithAuth(), async (req: RequestAuth, res: Response) => {

 try {
  const body = req.body as Status_Setting;
  const { userId } = req.auth;

  const result = await mdStatusSettingAdd({
   name: body.name,
   color: body.color,
   createdAt: new Date(),
   createdBy: userId,
   updatedAt: null,
   updatedBy: null,
  })

  res.json({
   status: HttpStatus.OK,
   data: result
  })
 } catch (error) {
  const errorResponse: ErrorResponseType = {
   status: HttpStatus.InternalServerError,
   error: "Internal Server Error",
  }
  console.log(error)
  res.status(errorResponse.status).json(errorResponse)
 }
})

app.get('/api/status-setting', ClerkExpressWithAuth(), async (req: RequestAuth, res: Response) => {
 try {
  const result = await mdStatusSettingGetAll()

  res.json({
   status: HttpStatus.OK,
   data: result
  })
 } catch (error) {
  const errorResponse: ErrorResponseType = {
   status: HttpStatus.InternalServerError,
   error: "Internal Server Error",
  }
  console.log(error)
  res.status(errorResponse.status).json(errorResponse)
 }
})

app.delete('/api/status-setting/:id', ClerkExpressWithAuth(), async (req: RequestAuth, res: Response) => {
 try {
   const id = req.params.id;
   const result = await mdStatusSettingDel(id);

   res.json({
     status: HttpStatus.OK,
     data: result
   });
 } catch (error) {
   const errorResponse: ErrorResponseType = {
     status: HttpStatus.InternalServerError,
     error: "Internal Server Error",
   };
   console.log(error);
   res.status(errorResponse.status).json(errorResponse);
 }
});

