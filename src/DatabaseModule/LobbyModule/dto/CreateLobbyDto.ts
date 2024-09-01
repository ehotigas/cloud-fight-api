import { ApiProperty } from "@nestjs/swagger";

export class CreateLobbyDto {
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: Number })
    maxPlayer: number;
}