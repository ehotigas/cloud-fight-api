import { Injectable, Logger } from "@nestjs/common";

export interface ILoggerFactory {
    /**
     * @param {string} context 
     * @returns {Logger}
     */
    getLogger: (context: string) => Logger
}

@Injectable()
export class LoggerFactory implements ILoggerFactory {
    public getLogger(context: string): Logger {
        return new Logger(context);
    }
}