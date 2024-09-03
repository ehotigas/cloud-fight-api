import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppToken } from "src/AppToken";

@Module({
    providers: [
        {
            provide: AppToken.JWT_SERVICE,
            useClass: JwtService
        }
    ],
    exports: [ AppToken.JWT_SERVICE ]
})
export class JwtModule {

}