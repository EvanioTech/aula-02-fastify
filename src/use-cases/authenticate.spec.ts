
import {expect, describe, it, beforeEach} from 'vitest'
import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUserUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut : AuthenticateUserUseCase;

describe('Authenticate Use case', () => {

    beforeEach(() => {
         usersRepository = new InMemoryUsersRepository()

         sut = new AuthenticateUserUseCase(usersRepository)
    }
    )
    it('should hash the authenticate', async () => {
    
       
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
    
   

    expect(() => sut.execute({
        email: 'jon@toin.com',
        password: '123456',
    }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
}
)

it('should not be able to aithenticate with wrong password', async () => {
    
    

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