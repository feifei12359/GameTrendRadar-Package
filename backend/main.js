"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
let app;
async function bootstrap() {
    if (!app) {
        app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter());
        app.enableCors({
            origin: ['http://localhost:5173', 'https://game-trend-radar.vercel.app', 'https://game-trend-radar-backend.vercel.app'],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        });
        app.setGlobalPrefix('api');
        await app.init();
    }
    return app;
}
async function handler(req, res) {
    const nestApp = await bootstrap();
    nestApp.getHttpAdapter().getInstance()(req, res);
}
exports.handler = handler;