import { LobbyController } from "./LobbyController";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseToken } from "../DatabaseToken";
import { LobbyAdapter } from "./LobbyAdapter";
import { LobbyService } from "./LobbyService";
import { Lobby, LobbySchema } from "./Lobby";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Lobby.name, schema: LobbySchema }
        ])
    ],
    controllers: [ LobbyController ],
    providers: [
        {
            provide: DatabaseToken.LOBBY_ADAPTER,
            useClass: LobbyAdapter
        },
        {
            provide: DatabaseToken.LOBBY_SERVICE,
            useClass: LobbyService
        }
    ]
})
export class LobbyModule {

}