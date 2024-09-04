import { UpdateLobbyDto } from "./dto/UpdateLobbyDto";
import { CreateLobbyDto } from "./dto/CreateLobbyDto";
import { DatabaseToken } from "../DatabaseToken";
import { GetLobbyDto } from "./dto/GetLobbyDto";
import { ILobbyService } from "./LobbyService";
import { Lobby } from "./Lobby";
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


@Controller("/lobby")
@ApiTags("Lobby")
export class LobbyController {
    public constructor(
        @Inject(DatabaseToken.LOBBY_SERVICE)
        private readonly service: ILobbyService
    ) {  }

    @Get("/")
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: GetLobbyDto
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async getAll(): Promise<GetLobbyDto> {
        return await this.service.findAll();
    }

    @Get("/:id")
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: Lobby
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
    ): Promise<Lobby> {
        return await this.service.findById(id);
    }

    @Post("/")
    @ApiBody({ type: CreateLobbyDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Created",
        type: GetLobbyDto
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal Server Error",
        type: InternalServerErrorException
    })
    public async post(
        @Body(new ValidationPipe()) input: CreateLobbyDto
    ): Promise<Lobby> {
        return await this.service.save(input);
    }

    @Patch("/:id")
    @ApiBody({ type: UpdateLobbyDto })
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Created",
        type: Lobby
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
        @Body(new ValidationPipe()) input: UpdateLobbyDto
    ): Promise<Lobby> {
        return await this.service.update(id, input);
    }

    @Delete("/:id")
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: Lobby
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
    ): Promise<Lobby> {
        return await this.service.remove(id);
    }
}