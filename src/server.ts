import 'dotenv';
import express from 'express';
import cors from 'cors';
import { router } from '../src/router';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from "./docs/swagger";

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api', router);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

const port = process.env.PORT || 5000;
app.listen({ port }, () => {
    console.log(`🚀  Server ready at http://localhost:${port}`);
});