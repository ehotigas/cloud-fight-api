import { IJwt, Jwt } from "src/JwtModule/Jwt";
import { JwtService } from "@nestjs/jwt";
import { AppToken } from "src/AppToken";
import { Test } from "@nestjs/testing";

describe("Jwt", () => {
    let jwt: IJwt;
    let jwtService: JwtService;

    const mockJwtService = {
        signAsync: jest.fn(),
        verifyAsync: jest.fn(),
    };

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            providers: [
                Jwt,
                {
                    provide: AppToken.JWT_SERVICE,
                    useValue: mockJwtService
                }
            ]
        }).compile();
        jwt = app.get<IJwt>(Jwt);
        jwtService = app.get<JwtService>(AppToken.JWT_SERVICE);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(jwt).toBeDefined();
        expect(jwtService).toBeDefined();
    });

    describe('signAsync(payload: string)', () => {
        it('should return a token successfully', async () => {
            const token = "";
            mockJwtService.signAsync.mockResolvedValue(token);
            const result = await jwt.signAsync("teste");
            expect(result).toEqual(token);
        });
    });

    describe('signAsync(payload: Buffer | object)', () => {
        it('should return a token successfully', async () => {
            const token = "";
            mockJwtService.signAsync.mockResolvedValue(token);
            const result = await jwt.signAsync({ test: "test" });
            expect(result).toEqual(token);
        });
    });

    describe('decode', () => {
        it('should return a generic object', async () => {
            const obj = {};
            mockJwtService.verifyAsync.mockResolvedValue(obj);
            const result = await jwt.decode("test");
            expect(result).toEqual(obj);
        });
    });
});