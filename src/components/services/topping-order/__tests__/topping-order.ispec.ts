import { BurgerService } from "../../burger"
import { OrderService } from "../../order"
import { ToppingService } from "../../topping"
import { UserService } from "../../user"
import { ToppingOrderService } from "../../topping-order"
import { clearDB } from "../../../../__tests__/setup.integration"

describe('topping-order', () => {

    it('create', async() => {
        await clearDB()
        // setup
        const createdTopping = await ToppingService.create({
            name:"topping",
            price:10.0
        })

        const createdUser = await UserService.create({
            name:"manu",
            email:"manu",
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
        expect(createdToppingOrder).toBeTruthy()
    })

    it('update', async() => {
        await clearDB()
        // setup
        const createdTopping = await ToppingService.create({
            name:"topping",
            price:10.0
        })

        const createdUser = await UserService.create({
            name:"manu",
            email:"manu",
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
        expect(createdToppingOrder.quantity).toBe(3)

    })

    it('remove', async() => {
        await clearDB()
        // setup
        const createdTopping = await ToppingService.create({
            name:"topping",
            price:10.0
        })

        const createdUser = await UserService.create({
            name:"manu",
            email:"manu",
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
        expect(createdToppingOrder).toBeFalsy()
    })

    it('remove', async() => {
        await clearDB()
        // setup
        const createdTopping = await ToppingService.create({
            name:"topping",
            price:10.0
        })

        const createdTopping2 = await ToppingService.create({
            name:"topping2",
            price:10.0
        })

        const createdUser = await UserService.create({
            name:"manu",
            email:"manu",
            password:"manu",
            phone:123
        })

        const createdBurger = await BurgerService.create({
            name:"burger"
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
        expect(toppingOrders.length).toBe(2)
    })
})