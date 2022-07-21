"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    await app.listen(3002, 'localhost');
}
bootstrap();
//# sourceMappingURL=main.js.map