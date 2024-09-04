import { BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthService, IAuthService } from "src/DatabaseModule/AuthModule/AuthService";
import { IUserService } from "src/DatabaseModule/UserModule/UserService";
import { DatabaseToken } from "src/DatabaseModule/DatabaseToken";
import { User } from "src/DatabaseModule/UserModule/User";
import { AppToken } from "src/AppToken";
import { Test } from "@nestjs/testing";

const token = "";
const user = new User({
    _id: "0",
    username: "test",
    email: "test@test.com",
    password: "test"
});

describe('AuthService', () => {
    let authService: IAuthService;
    let userService: IUserService;

    const mockUserService = {
        findUsername: jest.fn(),
        findByEmail: jest.fn(),
        save: jest.fn(),
    };

    const mockJwt = {
        signAsync: jest.fn().mockResolvedValue(token)
    };

    const mockLoggerFactory = {
        getLogger: jest.fn().mockReturnValue({
            log: jest.fn()
        })
    }

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: DatabaseToken.USER_SERVICE,
                    useValue: mockUserService
                },
                {
                    provide: AppToken.JWT,
                    useValue: mockJwt
                },
                {
                    provide: AppToken.LOGGER_FACTORY,
                    useValue: mockLoggerFactory
                }
            ]
        }).compile();
        
        authService = app.get<IAuthService>(AuthService);
        userService = app.get<IUserService>(DatabaseToken.USER_SERVICE);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('signIn', () => {
        it('should return a empty token successfuly from username', async () => {
            mockUserService.findUsername.mockResolvedValueOnce(user);
            const result = await authService.signIn({ username: "test", password: "test" });
            expect(result).toEqual({ token: token });
        });

        it('should return a empty token successfuly from email', async () => {
            mockUserService.findUsername.mockRejectedValueOnce(new NotFoundException());
            mockUserService.findByEmail.mockResolvedValueOnce(user);
            const result = await authService.signIn({ username: "test", password: "test" });
            expect(result).toEqual({ token: token });
        });

        it('should throw not found exception', async () => {
            mockUserService.findUsername.mockRejectedValueOnce(new NotFoundException());
            mockUserService.findByEmail.mockRejectedValueOnce(new NotFoundException());
            await expect(
                authService.signIn({ username: "test", password: "test" })
            ).rejects.toThrow(
                new NotFoundException()
            );
        });

        it('should throw unauthorized exception', async () => {
            mockUserService.findUsername.mockResolvedValueOnce(user);
            await expect(
                authService.signIn({ username: "test", password: "123" })
            ).rejects.toThrow(
                new UnauthorizedException()
            );
        });

        it('should throw internal server error exception', async () => {
            mockUserService.findUsername.mockRejectedValueOnce(new InternalServerErrorException());
            await expect(
                authService.signIn({ username: "test", password: "test" })
            ).rejects.toThrow(
                new InternalServerErrorException()
            );
        });
    });

    describe('signUp', () => {
        it('should create and return an user successfully', async () => {
            const tmpUser = { ...user };
            delete tmpUser.password;
            mockUserService.findUsername.mockRejectedValueOnce(new NotFoundException());
            mockUserService.findByEmail.mockRejectedValueOnce(new NotFoundException());
            mockUserService.save.mockResolvedValueOnce(tmpUser);
            
            const result = await authService.signUp(user);
            expect(result).toEqual(tmpUser);
        });

        it('should return a bad request exception username already exists', async () => {
            mockUserService.findUsername.mockResolvedValueOnce(user);
            await expect(
                authService.signUp(user)
            ).rejects.toThrow(
                new BadRequestException("Username already exists")
            );
        });

        it('should return a bad request exception email already exists', async () => {
            mockUserService.findUsername.mockRejectedValueOnce(new NotFoundException());
            mockUserService.findByEmail.mockResolvedValueOnce(user);
            await expect(
                authService.signUp(user)
            ).rejects.toThrow(
                new BadRequestException("Email already exists")
            );
        });

        it('should return an internal server error exception', async () => {
            mockUserService.findUsername.mockRejectedValueOnce(new InternalServerErrorException());
            await expect(
                authService.signUp(user)
            ).rejects.toThrow(
                new InternalServerErrorException()
            );
        });
    });
});