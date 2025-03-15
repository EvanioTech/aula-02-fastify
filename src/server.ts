
import { app } from './app';
import { env } from './env';

app.get('/', async (request, reply) => {
    
});
app.post('/users', async (request, reply) => {
    const { email, name, password } = request.body as { email: string, name: string , password: string };
    return { email, name, password };
    
});

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('Server is running on http://localhost:3000');
})