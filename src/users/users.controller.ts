import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './create-user.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';

@Controller('users')
export class UsersController {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    )   {}

    @Post()
    registerUser(@Body() createUserDto: CreateUserDto) {
        const user = new this.userModel({
            email: createUserDto.email,
            password: createUserDto.password,
            displayName: createUserDto.displayName,
        });


        user.generateToken();

        return user.save();
    }

    @UseGuards(AuthGuard('local'))
    @Post('sessions')
    async login(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(TokenAuthGuard)
    @Get('secret')
    async secret(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(TokenAuthGuard)
    @Delete('logout')
    async logout(@Req() req: Request) {
        const user = req.user as UserDocument;
        user.deleteToken();
        await user.save();
        return { message: 'Successfully logged out' };
    }
}