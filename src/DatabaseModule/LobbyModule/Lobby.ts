import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type LobbyDocument = HydratedDocument<Lobby>;

@Schema({ collection: "Lobby" })
export class Lobby {
    @ApiProperty({ type: String })
    _id: string;

    @ApiProperty({ type: String })
    @Prop()
    name: string;

    @ApiProperty({ type: Number })
    @Prop()
    maxPlayer: number;

    @ApiProperty({ type: Date })
    @Prop()
    createdAt: Date;
}

export const LobbySchema = SchemaFactory.createForClass(Lobby);