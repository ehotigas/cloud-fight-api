import { UserModule } from "../UserModule/UserModule";
import { AuthController } from "./AuthController";
import { DatabaseToken } from "../DatabaseToken";
import { AuthService } from "./AuthService";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        JwtModule,
        UserModule
    ],
    controllers: [ AuthController ],
    providers: [
        {
            provide: DatabaseToken.AUTH_SERVICE,
            useClass: AuthService
        }
    ]
})
export class AuthModule {
    
}