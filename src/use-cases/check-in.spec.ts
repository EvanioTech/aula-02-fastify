
import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './checkIn';

let chekInsRepository: InMemoryCheckInsRepository;
let sut : CheckInUseCase;

describe('Chek-in Use case', () => {

    beforeEach(() => {
         chekInsRepository = new InMemoryCheckInsRepository()

         sut = new CheckInUseCase(chekInsRepository)
    }
    )
    it('should be able to check-in', async () => {
    
       
     const {checkIn } =   await sut.execute({
           gymId: 'gym-01',
           userId: 'user-01',
        });

    

     expect(checkIn.id).toEqual(expect.any(String))


})




})