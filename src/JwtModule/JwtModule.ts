import { JwtService } from "@nestjs/jwt";
import { AppToken } from "src/AppToken";
import { Module } from "@nestjs/common";
import { Jwt } from "./Jwt";

@Module({
    providers: [
        {
            provide: AppToken.JWT_SERVICE,
            useClass: JwtService
        },
        {
            provide: AppToken.JWT,
            useClass: Jwt
        },
    ],
    exports: [ AppToken.JWT ]
})
export class JwtModule {

}