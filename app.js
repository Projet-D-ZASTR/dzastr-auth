import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';

import secureRoute from './routes/secure.route.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

    app.use('/api/secure', secureRoute);
    app.use('/api/users', userRoutes);

    app.use(errorHandler);

  return app;
}