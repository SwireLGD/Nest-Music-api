import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor (
        private reflector: Reflector,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        const request = context.switchToHttp().getRequest();
        if (request.user) {
            return false;
        }

        const user = await this.userModel.findById(request.user._id);

        if (!user) {
            return false;
        }

        return roles.includes(user.role);
    }
}