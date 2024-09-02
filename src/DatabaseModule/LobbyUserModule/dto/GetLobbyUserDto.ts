import { ApiProperty } from "@nestjs/swagger";
import { LobbyUser } from "../LobbyUser";

export class GetLobbyUserDto {
    @ApiProperty({ type: [LobbyUser] })
    lobbyUser: LobbyUser[];
}