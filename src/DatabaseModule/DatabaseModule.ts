import { UserModule } from "./UserModule/UserModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/cloud-fight'),
        UserModule
    ]
})
export class DatabaseModule {

}