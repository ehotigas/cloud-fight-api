import { CreateUserDto } from "./dto/CreateUserDto";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { DatabaseToken } from "../DatabaseToken";
import { GetUserDto } from "./dto/GetUserDto";
import { IUserService } from "./UserService";
import { User } from "./User";
import {
    ApiBody,
    ApiParam,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Inject,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Patch,
    Post,
    ValidationPipe
} from "@nestjs/common";


@Controller("/user")
@ApiTags("User")
export class UserController {
    public constructor(
        @Inject(DatabaseToken.USER_SERVICE)
        private readonly service: IUserService
    ) {  }

    @Get("/")
    @ApiResponse({
        status: HttpStatus.OK,
        type: GetUserDto
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async getAll(): Promise<GetUserDto> {
        return await this.service.findAll();
    }

    @Get("/:id")
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not Found",
        type: NotFoundException
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async getById(
        @Param("id") id: string
    ): Promise<User> {
        return await this.service.findById(id);
    }

    @Get("/username/:username")
    @ApiParam({
        name: "username",
        type: String
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not Found",
        type: NotFoundException
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async getUsername(
        @Param("username") username: string
    ): Promise<User> {
        return await this.service.findUsername(username);
    }

    @Get("/email/:email")
    @ApiParam({
        name: "email",
        type: String
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not Found",
        type: NotFoundException
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async getByEmail(
        @Param("email") email: string
    ): Promise<User> {
        return await this.service.findByEmail(email);
    }

    @Post("/")
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: User
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async post(
        @Body(new ValidationPipe()) input: CreateUserDto
    ): Promise<User> {
        return await this.service.save(input);
    }

    @Patch("/")
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: User
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not Found",
        type: NotFoundException
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async patch(
        @Param("id") id: string,
        @Body(new ValidationPipe()) input: UpdateUserDto
    ): Promise<User> {
        return await this.service.update(id, input);
    }

    @Delete("/")
    @ApiResponse({
        status: HttpStatus.OK,
        type: User
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not Found",
        type: NotFoundException
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async delete(
        @Param("id") id: string
    ): Promise<User> {
        return await this.service.remove(id);
    }
}