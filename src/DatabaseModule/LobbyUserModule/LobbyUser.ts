import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type LobbyUserDocument = HydratedDocument<LobbyUser>;

@Schema({ collection: "LobbyUser" })
export class LobbyUser {
    @ApiProperty({ type: Number })
    _id: number;

    @ApiProperty({ type: String })
    @Prop()
    lobbyId: string;

    @ApiProperty({ type: String })
    @Prop()
    userId: string;

    @ApiProperty({ type: Boolean })
    @Prop()
    ready: boolean;

    @ApiProperty({ type: Date })
    @Prop()
    createdAt: Date;
}

export const LobbyUserSchema = SchemaFactory.createForClass(LobbyUser);