import { ILoggerFactory, LoggerFactory } from "src/LoggerModule/LoggerFactory";
import { AppToken } from "src/AppToken";
import { Logger } from "@nestjs/common";
import { Test } from "@nestjs/testing";

describe("LoggerFactory", () => {
    let loggerFactory: ILoggerFactory;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            providers: [
                {
                    provide: AppToken.LOGGER_FACTORY,
                    useClass: LoggerFactory
                }
            ]
        }).compile();
        loggerFactory = app.get<ILoggerFactory>(AppToken.LOGGER_FACTORY);
    });

    it('should be defined', () => {
        expect(loggerFactory).toBeDefined();
    });

    describe('getLogger', () => {
        it("should return a logger successfully", async () => {
            const logger = loggerFactory.getLogger("teste");
            expect(logger).toBeInstanceOf(Logger);
        });
    });
});