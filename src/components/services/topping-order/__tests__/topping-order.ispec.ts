import { BurgerService } from "../../burger"
import { OrderService } from "../../order"
import { ToppingService } from "../../topping"
import { UserService } from "../../user"
import { ToppingOrderService } from "../../topping-order"
import { clearDB } from "../../../../__tests__/setup.integration"

describe('topping-order', () => {

    it('create', async() => {
        // setup
        const createdTopping = await ToppingService.create({
            name:"topping",
            price:10.0
        })

        const createdUser = await UserService.create({
            name:"manu",
            email:"maaaaaaaaanciwnu",
            password:"manu",
            phone:123
        })

        const createdBurger = await BurgerService.create({
            name:"burger",
            price_simple:100.0
        })

        const createdOrder = await OrderService.create({
            burgerId:createdBurger.id,
            userId: createdUser.id
        })

        // action
        const createdToppingOrder = await ToppingOrderService.create({
            toppingId: createdTopping.id,
            quantity:2,
            toppingOrderPrice:20.0,
            order: createdOrder
        })
        
        //assert
        await clearDB()
        expect(createdToppingOrder).toBeTruthy()
    })

    it('update', async() => {
        // setup
        const createdTopping = await ToppingService.create({
            name:"toppingg",
            price:10.0
        })

        const createdUser = await UserService.create({
            name:"manu",
            email:"manuu",
            password:"manu",
            phone:123
        })

        const createdBurger = await BurgerService.create({
            name:"burgerr",
            price_simple:100.0
        })

        const createdOrder = await OrderService.create({
            burgerId:createdBurger.id,
            userId: createdUser.id
        })

        let createdToppingOrder = await ToppingOrderService.create({
            toppingId: createdTopping.id,
            quantity:2,
            toppingOrderPrice:20.0,
            order: createdOrder
        })

        // action
        createdToppingOrder = await ToppingOrderService.update(
            {id:createdToppingOrder.id},
            {quantity:3}
        )
        
        // assert
        await clearDB()
        expect(createdToppingOrder.quantity).toBe(3)
    })

    it('remove', async() => {
        // setup
        const createdTopping = await ToppingService.create({
            name:"toppinggg",
            price:10.0
        })

        const createdUser = await UserService.create({
            name:"manu",
            email:"manuuuu",
            password:"manu",
            phone:123
        })

        const createdBurger = await BurgerService.create({
            name:"burgerrr",
            price_simple:100.0
        })

        const createdOrder = await OrderService.create({
            burgerId:createdBurger.id,
            userId: createdUser.id
        })

        let createdToppingOrder = await ToppingOrderService.create({
            toppingId: createdTopping.id,
            quantity:2,
            toppingOrderPrice:20.0,
            order: createdOrder
        })

        await ToppingOrderService.remove({id:createdToppingOrder.id})
        // action
        createdToppingOrder = await ToppingOrderService.find({id:createdToppingOrder.id})

        // assert
        await clearDB()
        expect(createdToppingOrder).toBeFalsy()
    })

    it('remove', async() => {
        // setup
        const createdTopping = await ToppingService.create({
            name:"toppingggggg",
            price:10.0
        })

        const createdTopping2 = await ToppingService.create({
            name:"topping222",
            price:10.0
        })

        const createdUser = await UserService.create({
            name:"manu",
            email:"mannnnnnnnnnuuuuuuuuu",
            password:"manu",
            phone:123
        })

        const createdBurger = await BurgerService.create({
            name:"burgerrrrrrrrrr"
        })

        const createdOrder = await OrderService.create({
            burgerId:createdBurger.id,
            userId: createdUser.id
        })

        const createdToppingOrder = await ToppingOrderService.create({
            toppingId: createdTopping.id,
            quantity:2,
            toppingOrderPrice:20.0,
            order: createdOrder
        })

        const createdToppingOrder2 = await ToppingOrderService.create({
            toppingId: createdTopping.id,
            quantity:2,
            toppingOrderPrice:20.0,
            order: createdOrder
        })

        // action
        const toppingOrders = await ToppingOrderService.findMany({
            order: createdOrder
        })

        // assert
        await clearDB()
        expect(toppingOrders.length).toBe(2)
    })
})