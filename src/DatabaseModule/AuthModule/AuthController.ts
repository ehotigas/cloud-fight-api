import { CreateUserDto } from "../UserModule/dto/CreateUserDto";
import { SignInResponseDto } from "./dto/SignInResponseDto";
import { RequestError } from "src/types/RequestError";
import { DatabaseToken } from "../DatabaseToken";
import { IAuthService } from "./AuthService";
import { SignInDto } from "./dto/SignInDto";
import { User } from "../UserModule/User";
import {
    ApiBody,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    Body,
    Controller,
    HttpStatus,
    Inject,
    Post,
    ValidationPipe
} from "@nestjs/common";

@Controller("/auth")
@ApiTags("Auth")
export class AuthController {
    public constructor(
        @Inject(DatabaseToken.AUTH_SERVICE)
        private readonly service: IAuthService
    ) {  }

    @Post("/signin")
    @ApiBody({ type: SignInDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: SignInResponseDto
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not Found",
        type: RequestError
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: RequestError
    })
    public async signIn(
        @Body(new ValidationPipe()) input: SignInDto
    ): Promise<SignInResponseDto> {
        return await this.service.signIn(input);
    }

    @Post("/signup")
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Ok",
        type: User
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Username already exists",
        type: RequestError
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Email already exists",
        type: RequestError
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: RequestError
    })
    public async signUp(
        @Body(new ValidationPipe()) input: CreateUserDto
    ): Promise<User> {
        return await this.service.signUp(input);
    }
}