import { LobbyUserModule } from "./LobbyUserModule/LobbyUserModule";
import { LobbyModule } from "./LobbyModule/LobbyModule";
import { UserModule } from "./UserModule/UserModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { AuthModule } from "./AuthModule/AuthModule";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/cloud-fight'),
        AuthModule,
        LobbyModule,
        LobbyUserModule,
        UserModule
    ]
})
export class DatabaseModule {

}