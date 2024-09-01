import { LobbyModule } from "./LobbyModule/LobbyModule";
import { UserModule } from "./UserModule/UserModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/cloud-fight'),
        LobbyModule,
        UserModule
    ]
})
export class DatabaseModule {

}