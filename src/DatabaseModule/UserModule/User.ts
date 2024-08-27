import { HydratedDocument } from "mongoose";
import { Schema } from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "User" })
export class User {

}