import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateLobbyuserDto } from "./CreateLobbyuserDto";

export class UpdateLobbyUserDto extends PartialType(CreateLobbyuserDto) {
    @ApiProperty({ type: Boolean })
    ready: boolean;
}