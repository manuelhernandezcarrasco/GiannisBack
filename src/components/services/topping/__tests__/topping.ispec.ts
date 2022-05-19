import { clearDB } from "../../../../__tests__/setup.integration"
import { ToppingService } from "../../topping"

describe('topping', () => {
    
    it('create', async() => {
        await clearDB()
        // setup

        // action
        const topping = await ToppingService.create({
            name: "topping",
            price:10.0
        })

        //assert
        expect(topping).toBeTruthy()
    })

    it('update', async() => {
        await clearDB()
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
    })

    it('remove', async() => {
        await clearDB()
        // setup
        let topping = await ToppingService.create({
            name: "topping",
            price:10.0
        })

        await ToppingService.remove({id:topping.id})
        // action

        topping = await ToppingService.find({id:topping.id})

        //assert
        expect(topping).toBeFalsy()
    })

})