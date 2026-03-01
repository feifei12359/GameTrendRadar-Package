"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let app;
async function getApp() {
    if (!app) {
        app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: [
                'http://localhost:5173', 
                'https://game-trend-radar.vercel.app', 
                'https://game-trend-radar-backend.vercel.app',
                'https://game-trend-radar-frontend.vercel.app',
                'https://*.vercel.app',
                'https://*.railway.app'
            ],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        });
        app.setGlobalPrefix('api');
        await app.init();
    }
    return app;
}
module.exports = async (req, res) => {
    const nestApp = await getApp();
    return nestApp.getHttpAdapter().getInstance()(req, res);
};