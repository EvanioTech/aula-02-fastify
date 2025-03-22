
import {expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './checkIn';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';


let chekInsRepository: InMemoryCheckInsRepository;
let sut : CheckInUseCase;
let gymsRepository: InMemoryGymsRepository;
describe('Chek-in Use case', () => {

    beforeEach(() => {
         chekInsRepository = new InMemoryCheckInsRepository()
         gymsRepository = new InMemoryGymsRepository()

         sut = new CheckInUseCase(chekInsRepository, gymsRepository)

          gymsRepository.items.push({
          id: 'gym-01',
          title: 'Academia 01',
          description: 'birl',
          phone: '',
          latitude: new Decimal(0),
          longitude: new Decimal(0),
          createdAt: new Date(),
    })

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
           userLatitude: 0,
           userLongitude: 0,
        });

    

     expect(checkIn.id).toEqual(expect.any(String))

     


})

it('should not be able to check-in in twice in the same day', async () => {
     vi.setSystemTime(new Date('2021-01-01 10:00:00'))
    

     await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
          userLatitude: 0,
           userLongitude: 0,
           
       });
       
     await expect(() => sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
           userLongitude: 0,
           
     })).rejects.toBeInstanceOf(Error)

     


})

it('should  be able to check-in in twice but in different days', async () => {
     vi.setSystemTime(new Date('2021-01-01 10:00:00'))
    

     await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
          userLatitude: 0,
           userLongitude: 0,
           
       });

           vi.setSystemTime(new Date('2021-01-02 10:00:00'))
       
    const {checkIn } = await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
           userLongitude: 0,
           
     })

     expect(checkIn.id).toEqual(expect.any(String))

     


})

it('should not be able to check-in on distant gym', async () => {

     
     vi.setSystemTime(new Date('2021-01-01 10:00:00'))

     gymsRepository.items.push({
          id: 'gym-02',
          title: 'Academia 02',
          description: 'birl',
          phone: '',
          latitude: new Decimal(-3.8744272),
          longitude: new Decimal(-38.5017396),
          createdAt: new Date(),
    })
    
       
     await expect(()=>
      sut.execute({
           gymId: 'gym-02',
           userId: 'user-01',
           userLatitude: -3.71722,
           userLongitude: -38.5431,
           
        })
     ).rejects.toBeInstanceOf(Error)

     })

})