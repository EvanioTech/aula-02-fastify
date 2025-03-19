
import {expect, describe, it} from 'vitest'
import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUserUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';



describe('Authenticate Use case', () => {
    it('should hash the authenticate', async () => {
    
        const usersRepository = new InMemoryUsersRepository()

        const sut = new AuthenticateUserUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'jon@toin.com',
            password_hash: await hash('123456', 6),
        });

    const {user} = await sut.execute({
        
        email: 'jon@toin.com',
        password: '123456',
    });

    expect(user.id).toEqual(expect.any(String))

})

it('should not be able to aithenticate with wrong email', async () => {
    
    const usersRepository = new InMemoryUsersRepository()

    const sut = new AuthenticateUserUseCase(usersRepository)

    expect(() => sut.execute({
        email: 'jon@toin.com',
        password: '123456',
    }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
}
)

it('should not be able to aithenticate with wrong password', async () => {
    
    const usersRepository = new InMemoryUsersRepository()

    const sut = new AuthenticateUserUseCase(usersRepository)

    await usersRepository.create({
        name: 'John Doe',
        email: 'jonh@toin.com',
        password_hash: await hash('123456', 6),
    });

    expect(() => sut.execute({
        email: 'jonh@toin.com',
        password: '1234567',
    }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
}
)

})