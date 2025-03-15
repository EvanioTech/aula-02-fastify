
import { app } from './app';
import { env } from './env';

app.get('/', async (request, reply) => {
    return { message: 'Hello Matias' };
});

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('Server is running on http://localhost:3000');
})