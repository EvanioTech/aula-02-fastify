
import {expect, describe, it, beforeEach} from 'vitest'
import { RegisterUseCase } from './register';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

import { UserAlreadyExistsError } from './errors/user-already-exists-error';


let usersRepository: InMemoryUsersRepository;
let sut : RegisterUseCase;

describe('register', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()

        sut = new RegisterUseCase(usersRepository)
   }
   )
    it('should hash the password', async () => {

        
    
      

        const email = 'jon@alb.com'

        
        await sut.execute({
            name: 'John Doe',
            email,
            password: '123456'
        });

        await expect(()=>
        sut.execute({
            name: 'John Doe',
            email,
        password: '123456',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
}
)

it('should hash the register', async () => {

  

    const {user} = await sut.execute({
        name: 'John Doe',
        email: 'jon@dester.com',
        password: '123456',
    });

    expect(user.id).toEqual(expect.any(String))

})