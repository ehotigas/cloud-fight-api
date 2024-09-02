import { RequestError } from "src/types/RequestError";
import { CreateUserDto } from "./dto/CreateUserDto";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { DatabaseToken } from "../DatabaseToken";
import { GetUserDto } from "./dto/GetUserDto";
import { IUserService } from "./UserService";
import { User } from "./User";
import {
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
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
        status: 200,
        type: GetUserDto
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getAll(): Promise<GetUserDto | RequestError> {
        return await this.service.findAll();
    }

    @Get("/:id")
    @ApiResponse({
        status: 200,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getById(
        @Param("id") id: string
    ): Promise<User | RequestError> {
        return await this.service.findById(id);
    }

    @Get("/username/:username")
    @ApiResponse({
        status: 200,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getUsername(
        @Param("username") username: string
    ): Promise<User | RequestError> {
        return await this.service.findUsername(username);
    }

    @Get("/email/:email")
    @ApiResponse({
        status: 200,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getByEmail(
        @Param("email") email: string
    ): Promise<User | RequestError> {
        return await this.service.findByEmail(email);
    }

    @Post("/")
    @ApiResponse({
        status: 201,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async post(
        @Body(new ValidationPipe()) input: CreateUserDto
    ): Promise<User | RequestError> {
        return await this.service.save(input);
    }

    @Patch("/")
    @ApiResponse({
        status: 201,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async patch(
        @Param("id") id: string,
        @Body(new ValidationPipe()) input: UpdateUserDto
    ): Promise<User | RequestError> {
        return await this.service.update(id, input);
    }

    @Delete("/")
    @ApiResponse({
        status: 204,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async delete(
        @Param("id") id: string
    ): Promise<User | RequestError> {
        return await this.service.remove(id);
    }
}