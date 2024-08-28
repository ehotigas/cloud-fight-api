import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type LobbyDocument = HydratedDocument<Lobby>;

@Schema({ collection: "Lobby" })
export class Lobby {
    @ApiProperty({ type: String })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    maxPlayer: number;

    
}

export const LobbySchema = SchemaFactory.createForClass(Lobby);