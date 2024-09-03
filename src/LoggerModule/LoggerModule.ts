import { Module } from "@nestjs/common";
import { AppToken } from "src/AppToken";
import { LoggerFactory } from "./LoggerFactory";

@Module({
    providers: [
        {
            provide: AppToken.LOGGER_FACTORY,
            useClass: LoggerFactory
        }
    ],
    exports: [
        AppToken.LOGGER_FACTORY
    ]
})
export class LoggerModule {

}