import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { LobbyUser } from "../LobbyUserModule/LobbyUser";
import { HydratedDocument, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

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

    @ApiProperty({ type: [LobbyUser] })
    lobbyUsers?: LobbyUser[];
}

const LobbySchema = SchemaFactory.createForClass(Lobby);

// Configuração do campo virtual
LobbySchema.virtual('lobbyUsers', {
    ref: 'LobbyUser', // Nome do modelo referenciado
    localField: '_id', // Campo local no schema atual
    foreignField: 'lobbyId', // Campo referenciado no schema LobbyUser
});

// Habilitar a virtual para JSON e objetos
LobbySchema.set('toObject', { virtuals: true });
LobbySchema.set('toJSON', { virtuals: true });

export { LobbySchema };