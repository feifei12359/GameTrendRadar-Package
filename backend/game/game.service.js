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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GameService = class GameService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getGames(minScore) {
        const game = await this.prisma.game();
        if (minScore) {
            return game.findMany({
                where: {
                    totalScore: {
                        gte: minScore,
                    },
                },
                orderBy: {
                    totalScore: 'desc',
                },
            });
        }
        return game.findMany({
            orderBy: {
                totalScore: 'desc',
            },
        });
    }
    async createGame(gameData) {
        const game = await this.prisma.game();
        return game.create({
            data: gameData,
        });
    }
    async updateGame(id, data) {
        const game = await this.prisma.game();
        return game.update({
            where: { id },
            data,
        });
    }
    async findByUrl(url) {
        const game = await this.prisma.game();
        return game.findUnique({
            where: { url },
        });
    }
    async getRecentGames(days) {
        const game = await this.prisma.game();
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        return game.findMany({
            where: {
                createdAt: {
                    gte: cutoffDate,
                },
            },
        });
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GameService);
//# sourceMappingURL=game.service.js.map