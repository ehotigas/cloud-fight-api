import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppToken } from "src/AppToken";

export declare class IJwt {
    signAsync(payload: string): Promise<string>;
    signAsync(payload: Buffer | object): Promise<string>;
    decode<T extends object>(token: string): Promise<T>;
}

@Injectable()
export class Jwt {
    private readonly key: string;
    public constructor(
        @Inject(AppToken.JWT_SERVICE)
        private readonly jwtService: JwtService
    ) {
        this.key = process.env.JWT_TOKEN || "";
    }

    public async signAsync(payload: string | Buffer | object): Promise<string> {
        if (typeof payload === 'string') {
            return this.jwtService.signAsync(payload, { secret: this.key });
        }
        else {
            return this.jwtService.signAsync(payload, { secret: this.key });
        }
    }

    public async decode<T extends object>(token: string): Promise<T> {
        return await this.jwtService.verifyAsync(token, { secret: this.key });
    }
}