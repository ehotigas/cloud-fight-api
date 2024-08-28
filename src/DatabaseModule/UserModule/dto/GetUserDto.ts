import { ApiProperty } from "@nestjs/swagger";
import { User } from "../User";

export class GetUserDto {
    @ApiProperty({ type: [User] })
    users: User[]
}