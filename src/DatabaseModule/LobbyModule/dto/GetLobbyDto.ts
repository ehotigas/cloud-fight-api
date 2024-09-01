import { ApiProperty } from "@nestjs/swagger";
import { Lobby } from "../Lobby";

export class GetLobbyDto {
    @ApiProperty({ type: [Lobby] })
    lobby: Lobby[]
}