import { clearDB } from "../../../../__tests__/setup.integration"
import { ToppingService } from "../../topping"

describe('topping', () => {
    
    it('create', async() => {
        // setup

        // action
        const topping = await ToppingService.create({
            name: "topping",
            price:10.0
        })

        //assert
        await clearDB()
        expect(topping).toBeTruthy()
    })

    it('update', async() => {
        // setup
        let topping = await ToppingService.create({
            name: "topping",
            price:10.0
        })

        // action
        topping = await ToppingService.update(
            {id:topping.id},
            {price:20.0}
        )

        //assert
        expect(Number(topping.price)).toBe(20)
        await clearDB()
    })

    it('remove', async() => {
        // setup
        let topping = await ToppingService.create({
            name: "topping",
            price:10.0
        })

        await ToppingService.remove({id:topping.id})
        // action

        topping = await ToppingService.find({id:topping.id})

        //assert
        await clearDB()
        expect(topping).toBeFalsy()
    })

})