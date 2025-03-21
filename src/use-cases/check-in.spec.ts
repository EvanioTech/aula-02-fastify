
import {expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './checkIn';


let chekInsRepository: InMemoryCheckInsRepository;
let sut : CheckInUseCase;

describe('Chek-in Use case', () => {

    beforeEach(() => {
         chekInsRepository = new InMemoryCheckInsRepository()

         sut = new CheckInUseCase(chekInsRepository)

         vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    }
)


    
    it('should be able to check-in', async () => {
     vi.setSystemTime(new Date('2021-01-01 10:00:00'))
    
       
     const {checkIn } =   await sut.execute({
           gymId: 'gym-01',
           userId: 'user-01',
        });

    

     expect(checkIn.id).toEqual(expect.any(String))

     


})

it('should not be able to check-in in twice in the same day', async () => {
     vi.setSystemTime(new Date('2021-01-01 10:00:00'))
    

     await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
       });
       
     await expect(() => sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
     })).rejects.toBeInstanceOf(Error)

     


})

it('should  be able to check-in in twice but in different days', async () => {
     vi.setSystemTime(new Date('2021-01-01 10:00:00'))
    

     await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
       });

           vi.setSystemTime(new Date('2021-01-02 10:00:00'))
       
    const {checkIn } = await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
     })

     expect(checkIn.id).toEqual(expect.any(String))

     


})




})