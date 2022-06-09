import { ToppingOrder } from "@prisma/client"
import { BurgerService } from "../../burger"
import { ToppingService } from "../../topping"
import { ToppingOrderService } from "../../topping-order"
import { UserService } from "../../user"
import { OrderService } from "../../order"
import { clearDB } from "../../../../__tests__/setup.integration"

describe('order', () => {
    it('create', async () => {
        // setup
        const createdBurger = await BurgerService.create({
            name: "burger",
            description: "aaaa",
            price_simple: 100.0,
            price_double: 100.0
        })
    
        const createdUser = await UserService.create({
            email:"manu",
            name:"name",
            password: "1234",
            phone: 12351241242
        })

        // action
        const createdOrder = await OrderService.create({
            burgerId: createdBurger.id,
            userId: createdUser.id
        })

        // assert
        await clearDB()
        expect(createdOrder).toBeTruthy()
    })

    it('update', async () => {
        // setup
        const createdBurger = await BurgerService.create({
            name: "burgerr",
            description: "aaaa",
            price_simple: 100.0,
            price_double: 100.0
        })
    
        const createdUser = await UserService.create({
            email:"manuu",
            name:"name",
            password: "1234",
            phone: 12351241242
        })

        const createdOrder = await OrderService.create({
            burgerId: createdBurger.id,
            userId: createdUser.id,
            orderPrice: 100.0
        })

        const createdTopping = await ToppingService.create({
            name:"toppingggggggggggggggggggggggggggggggggggggggggggggggggggggg",
            price:10.0
        })

        const createdTopping2 = await ToppingService.create({
            name:"topping2",
            price:10.0
        })

        const createdToppingOrder = await ToppingOrderService.create({
            toppingId: createdTopping.id,
            order: createdOrder,
            quantity:2,
            toppingOrderPrice: 20.0,
        })

        const createdToppingOrder2 = await ToppingOrderService.create({
            toppingId: createdTopping2.id,
            order: createdOrder,
            quantity:2,
            toppingOrderPrice: 20.0,
        })

        const toppings:ToppingOrder[] = [createdToppingOrder, createdToppingOrder2]

        // action
        const order = await OrderService.update( {id:createdOrder.id}, { toppings:toppings, orderPrice:140.0} );
        
        // assert
        await clearDB()
        expect(Number(order.orderPrice)).toBe(140)
    })

    it('remove', async () => {
        // setup
        const createdBurger = await BurgerService.create({
            name: "burgerrr",
            description: "aaaa",
            price_simple: 100.0,
            price_double: 100.0
        })
    
        const createdUser = await UserService.create({
            email:"maaaaaaaaaaaaaaaaaaaaaaaaaanuuu",
            name:"name",
            password: "1234",
            phone: 12351241242
        })

        const createdOrder = await OrderService.create({
            burgerId: createdBurger.id,
            userId: createdUser.id
        })

        await OrderService.remove({ id: createdOrder.id })

        // action

        const order = await OrderService.find({id:createdOrder.id})

        // assert
        await clearDB()
        expect(order).toBeFalsy()
    })
    
})