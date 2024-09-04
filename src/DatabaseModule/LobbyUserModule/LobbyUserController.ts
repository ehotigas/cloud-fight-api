import { CreateLobbyuserDto } from "./dto/CreateLobbyuserDto";
import { UpdateLobbyUserDto } from "./dto/UpdateLobbyUserDto";
import { GetLobbyUserDto } from "./dto/GetLobbyUserDto";
import { ILobbyUserService } from "./LobbyUserService";
import { DatabaseToken } from "../DatabaseToken";
import { LobbyUser } from "./LobbyUser";
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


@Controller("/lobby-user")
@ApiTags("LobbyUser")
export class LobbyUserController {
    public constructor(
        @Inject(DatabaseToken.LOBBY_USER_SERVICE)
        private readonly service: ILobbyUserService
    ) {  }

    @Get("/")
    @ApiResponse({
        status: HttpStatus.OK,
        type: GetLobbyUserDto
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async getAll(): Promise<GetLobbyUserDto> {
        return await this.service.findAll();
    }

    @Get("/:id")
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: LobbyUser
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
    ): Promise<LobbyUser> {
        return await this.service.findById(id);
    }

    @Post("/")
    @ApiBody({ type: CreateLobbyuserDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: LobbyUser
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async post(
        @Body(new ValidationPipe()) input: CreateLobbyuserDto
    ): Promise<LobbyUser> {
        return await this.service.save(input);
    }

    @Patch("/:id")
    @ApiBody({ type: UpdateLobbyUserDto })
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: LobbyUser
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
        @Body(new ValidationPipe()) input: UpdateLobbyUserDto
    ): Promise<LobbyUser> {
        return await this.service.update(id, input);
    }

    @Delete("/:id")
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: LobbyUser
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
    ): Promise<LobbyUser> {
        return await this.service.remove(id);
    }
}