import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { Model } from "mongoose";
import { User } from "src/user/entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { generateMessage } from "src/utils/message.utility";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_SECRET
        });
    }

    async validate(payload) {
        // console.log(payload)
        const user = await this.userModel.findOne({
            _id: payload._id
          }).populate('role')
          if (user) {
            if (user.isDisable) {
                throw new BadRequestException(generateMessage('User').IS_DISABLED)
            }
            return user
        }
        throw new UnauthorizedException()

    }
}