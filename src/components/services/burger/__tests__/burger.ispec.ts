import { clearDB } from "../../../../__tests__/setup.integration"
import { BurgerService } from "../../burger"

describe('burger', () => {
    it('create', async () => {
        // setup
        const createdBurger = await BurgerService.create({
            name: "burger",
            description: "aaaa",
            price_simple: 100.0,
            price_double: 100.0
        })
    
        // action
    
        // assert
        await clearDB()
        expect(createdBurger).toBeTruthy()
    })

    it('remove', async () => {
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
        await clearDB()
        expect(burger).toBeFalsy()
    })

    it('update', async () => {
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
        await clearDB()
        expect(Number(burger.price_veggie)).toBe(100.0)
    })
    
})