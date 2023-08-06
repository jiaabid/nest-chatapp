import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { Model } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "chat"
        });
    }

    async validate(payload) {
        const user = await this.userModel.findOne({
            _id: payload.sub
          })
      
        throw new UnauthorizedException()

    }
}