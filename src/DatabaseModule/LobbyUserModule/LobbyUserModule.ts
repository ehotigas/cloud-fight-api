import { LoggerModule } from "src/LoggerModule/LoggerModule";
import { LobbyUserController } from "./LobbyUserController";
import { LobbyUser, LobbyUserSchema } from "./LobbyUser";
import { LobbyUserAdapter } from "./LobbyUserAdapter";
import { LobbyUserService } from "./LobbyUserService";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseToken } from "../DatabaseToken";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: LobbyUser.name, schema: LobbyUserSchema }
        ]),
        LoggerModule
    ],
    controllers: [ LobbyUserController ],
    providers: [
        {
            provide: DatabaseToken.LOBBY_USER_ADAPTER,
            useClass: LobbyUserAdapter
        },
        {
            provide: DatabaseToken.LOBBY_USER_SERVICE,
            useClass: LobbyUserService
        }
    ]
})
export class LobbyUserModule {

}