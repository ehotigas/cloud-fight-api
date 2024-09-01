import { CreateLobbyDto } from "./CreateLobbyDto";
import { PartialType } from "@nestjs/swagger";

export class UpdateLobbyDto extends PartialType(CreateLobbyDto) {
    
}