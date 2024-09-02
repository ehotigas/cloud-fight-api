import { ApiProperty } from "@nestjs/swagger";

export class CreateLobbyuserDto {
    @ApiProperty({ type: String })
    lobbyId: string;

    @ApiProperty({ type: String })
    userId: string;
}