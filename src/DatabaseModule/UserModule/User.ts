import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "User" })
export class User {
    @ApiProperty({ type: String })
    _id: string;

    @ApiProperty({ type: String })
    @Prop()
    username: string;

    @ApiProperty({ type: String })
    @Prop()
    email: string;

    @ApiProperty({ type: String })
    @Prop()
    password: string;

    @ApiProperty({ type: Date })
    @Prop()
    createdAt: Date;

    @ApiProperty({ type: Date })
    @Prop()
    updatedAt: Date;

    @ApiProperty({ type: Boolean })
    @Prop()
    deleted: boolean;
 
    @ApiProperty({ type: Date })
    @Prop()
    deletedAt: Date;

    @ApiProperty({ type: Boolean })
    @Prop()
    admin: boolean;

    public constructor(user?: Partial<User>) {
        this._id = user?._id;
        this.username = user?.username;
        this.email = user?.email;
        this.password = user?.password;
        this.createdAt = user?.createdAt;
        this.updatedAt = user?.updatedAt;
        this.deleted = user?.deleted;
        this.deletedAt = user?.deletedAt;
        this.admin = user?.admin;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);