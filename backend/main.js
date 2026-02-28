"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let server;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:5173', 'https://game-trend-radar.vercel.app', 'https://game-trend-radar-backend.vercel.app'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    return app;
}
if (require.main === module) {
    // 直接运行时（本地开发）
    bootstrap().then(app => {
        const port = process.env.PORT || 4000;
        app.listen(port).then(() => {
            console.log(`Application is running on: http://localhost:${port}`);
        });
    });
}
// 导出为Vercel Serverless函数
module.exports = async (req, res) => {
    const app = await bootstrap();
    await app.init();
    const server = app.getHttpAdapter().getInstance();
    return server(req, res);
};