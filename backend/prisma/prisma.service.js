"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
let PrismaService = class PrismaService {
    constructor() {
        // 使用内存存储作为后备方案
        this.games = [];
        this.nextId = 1;
    }
    async onModuleInit() {
        console.log('Using in-memory storage for games');
    }
    async onModuleDestroy() {
        // 清理资源
    }
    // 模拟Prisma Client的方法
    async game() {
        return {
            findMany: async (options) => {
                let result = [...this.games];
                if (options && options.where && options.where.totalScore) {
                    result = result.filter(game => game.totalScore >= options.where.totalScore.gte);
                }
                if (options && options.orderBy && options.orderBy.totalScore) {
                    result.sort((a, b) => {
                        return options.orderBy.totalScore === 'desc' ? b.totalScore - a.totalScore : a.totalScore - b.totalScore;
                    });
                }
                return result;
            },
            create: async (options) => {
                const newGame = {
                    id: this.nextId++,
                    ...options.data,
                    createdAt: new Date()
                };
                this.games.push(newGame);
                return newGame;
            },
            findUnique: async (options) => {
                return this.games.find(game => game.url === options.where.url) || null;
            },
            update: async (options) => {
                const index = this.games.findIndex(game => game.id === options.where.id);
                if (index !== -1) {
                    this.games[index] = {
                        ...this.games[index],
                        ...options.data
                    };
                    return this.games[index];
                }
                return null;
            }
        };
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map