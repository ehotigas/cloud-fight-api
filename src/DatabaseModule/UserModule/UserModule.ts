import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./UserController";
import { DatabaseToken } from "../DatabaseToken";
import { UserAdapter } from "./UserAdapter";
import { UserService } from "./UserService";
import { User, UserSchema } from "./User";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    controllers: [ UserController ],
    providers: [
        {
            provide: DatabaseToken.USER_ADAPTER,
            useClass: UserAdapter
        },
        {
            provide: DatabaseToken.USER_SERVICE,
            useClass: UserService
        }
    ]
})
export class UserModule {

}