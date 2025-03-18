
import {expect, describe, it} from 'vitest'
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { register } from 'module';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';


describe('register', () => {
    it('should hash the password', async () => {
    
        const usersRepository = new InMemoryUsersRepository()

        const registerUserCase = new RegisterUseCase(usersRepository)

        const email = 'jon@example.com'

        
        await registerUserCase.execute({
            name: 'John Doe',
            email,
            password: '123456'
        });

        await expect(()=>
        registerUserCase.execute({
            name: 'John Doe',
            email,
        password: '123456',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
}
)

it('should hash the register', async () => {

    const usersRepository = new InMemoryUsersRepository()

    const registerUserCase = new RegisterUseCase(usersRepository)

    const {user} = await registerUserCase.execute({
        name: 'John Doe',
        email: 'jon@example.com',
        password: '123456',
    });

    expect(user.id).toEqual(expect.any(String))

})