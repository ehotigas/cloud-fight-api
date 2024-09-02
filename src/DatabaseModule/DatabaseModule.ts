import { LobbyUserModule } from "./LobbyUserModule/LobbyUserModule";
import { LobbyModule } from "./LobbyModule/LobbyModule";
import { UserModule } from "./UserModule/UserModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/cloud-fight'),
        LobbyModule,
        LobbyUserModule,
        UserModule
    ]
})
export class DatabaseModule {

}