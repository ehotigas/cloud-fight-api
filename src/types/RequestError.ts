import { ApiProperty } from "@nestjs/swagger";

export class RequestError {
    @ApiProperty({ type: String })
    message: string;

    @ApiProperty({ type: Number })
    statusCode: number;

    public constructor(
        message: string,
        statusCode: number = 500
    ) {
        this.message = message;
        this.statusCode = statusCode;
    }
}