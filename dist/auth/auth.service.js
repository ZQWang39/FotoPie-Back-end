"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_schemas_1 = require("./schema/auth.schemas");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const role_enums_1 = require("./schema/role.enums");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
dotenv.config();
let AuthService = class AuthService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException();
        return user;
    }
    async login({ email, password }) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        if (role_enums_1.role.Admin !== user.role) {
            throw new common_1.NotFoundException();
        }
        if (password !== user.password) {
            throw new common_1.ForbiddenException;
        }
        const tokens = await this.getTokens(email);
        return tokens;
    }
    async getTokens(email) {
        const at = await Promise.all([
            this.jwtService.signAsync({ email, }, {
                secret: process.env.Secret,
                expiresIn: "2d",
            }),
        ]);
        return at;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(auth_schemas_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map