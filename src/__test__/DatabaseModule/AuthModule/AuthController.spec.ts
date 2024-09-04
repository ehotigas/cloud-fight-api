import { AuthController } from "src/DatabaseModule/AuthModule/AuthController";
import { IAuthService } from "src/DatabaseModule/AuthModule/AuthService";
import { DatabaseToken } from "src/DatabaseModule/DatabaseToken";
import { Test } from "@nestjs/testing";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "src/DatabaseModule/UserModule/User";

const token = "";

describe("AuthController", () => {
    let authController: AuthController;
    let authService: IAuthService;

    const mockService = {
        signIn: jest.fn(),
        signUp: jest.fn(),
    };

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            providers: [
                AuthController,
                {
                    provide: DatabaseToken.AUTH_SERVICE,
                    useValue: mockService
                }
            ]
        }).compile();
        authController = app.get<AuthController>(AuthController);
        authService = app.get<IAuthService>(DatabaseToken.AUTH_SERVICE);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
        expect(authService).toBeDefined();
    });

    describe('signIn', () => {
        it('should return a token dto successfully', async () => {
            mockService.signIn.mockResolvedValue({ token: token });
            const result = await authController.signIn({ username: "test", password: "test" });
            expect(result).toEqual({ token: token });
        });

        it('should throw not found exception', async () => {
            mockService.signIn.mockRejectedValueOnce(new NotFoundException());
            await expect(
                authController.signIn({ username: "test", password: "test" })
            ).rejects.toThrow(
                new NotFoundException()
            );
        });

        it('should throw internal server error exception', async () => {
            mockService.signIn.mockRejectedValueOnce(new InternalServerErrorException());
            await expect(
                authController.signIn({ username: "test", password: "test" })
            ).rejects.toThrow(
                new InternalServerErrorException()
            );
        });
    });

    describe('signUp', () => {
        it('should return a token dto successfully', async () => {
            const user = new User();
            const tmpUser = { ...user };
            delete tmpUser.password;
            mockService.signUp.mockResolvedValue(user);
            const result = await authController.signUp({ username: "test", email: "test@test.com", password: "test" });
            expect(result).toEqual(tmpUser);
        });

        it('should throw not found exception', async () => {
            mockService.signUp.mockRejectedValueOnce(new NotFoundException());
            await expect(
                authController.signUp({ username: "test", email: "test@test.com", password: "test" })
            ).rejects.toThrow(
                new NotFoundException()
            );
        });

        it('should throw internal server error exception', async () => {
            mockService.signUp.mockRejectedValueOnce(new InternalServerErrorException());
            await expect(
                authController.signUp({ username: "test", email: "test@test.com", password: "test" })
            ).rejects.toThrow(
                new InternalServerErrorException()
            );
        });
    });
});