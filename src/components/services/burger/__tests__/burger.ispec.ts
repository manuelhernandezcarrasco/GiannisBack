import { clearDB } from "../../../../__tests__/setup.integration"
import { BurgerService } from "../../burger"

describe('burger', () => {
    it('create', async () => {
        await clearDB()
        // setup
        const createdBurger = await BurgerService.create({
            name: "burger",
            description: "aaaa",
            price_simple: 100.0,
            price_double: 100.0
        })
    
        // action
    
        // assert
        expect(createdBurger).toBeTruthy()
    })

    it('remove', async () => {
        await clearDB()
        // setup
        const createdBurger = await BurgerService.create({
            name: "burger",
            description: "aaaa",
            price_simple: 100.0,
            price_double: 100.0
        })
    
        // action
        await BurgerService.remove({name:"burger"})
        const burger = await BurgerService.find({name:"burger"})
    
        // assert
        expect(burger).toBeFalsy()
    })

    it('update', async () => {
        await clearDB()
        // setup
        const createdBurger = await BurgerService.create({
            name: "burger",
            description: "aaaa",
            price_simple: 100.0,
            price_double: 100.0
        })
    
        // action
        const burger = await BurgerService.update({name:"burger"}, {price_veggie:100.0})
    
        // assert
        expect(Number(burger.price_veggie)).toBe(100.0)
    })
    
})