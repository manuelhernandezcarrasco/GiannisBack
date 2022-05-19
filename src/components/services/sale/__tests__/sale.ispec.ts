import { clearDB } from "../../../../__tests__/setup.integration"
import { BurgerService } from "../../burger"
import { OrderService } from "../../order"
import { ToppingService } from "../../topping"
import { ToppingOrderService } from "../../topping-order"
import { UserService } from "../../user"
import { SaleService } from "../sale.service"

describe('sale', () => {
    it('create', async () => {
        await clearDB()
        // setup
        const createdUser = await UserService.create({
            name: "manu",
            email:"manu",
            password:"manu",
            phone: 123
        })

        const createdBurger = await BurgerService.create({
            name:"burger1",
            price_simple: 20.0,
        })

        const createdBurger2 = await BurgerService.create({
            name:"burger2",
            price_simple:20.0
        })

        const createdTopping = await ToppingService.create({
            name:"topping",
            price: 10.0
        })

        let createdOrder2 = await OrderService.create({
            userId: createdUser.id,
            burgerId: createdBurger2.id,
            orderPrice:20.0
        })

        const createdToppingOrder = await ToppingOrderService.create({
            toppingId: createdTopping.id,
            quantity: 2,
            order: createdOrder2,
            toppingOrderPrice: 20.0
        })

        const toppings = [createdToppingOrder]

        const createdOrder = await OrderService.create({
            userId: createdUser.id,
            burgerId: createdBurger.id,
            orderPrice:20.0

        })

        createdOrder2 = await OrderService.update(
            {id:createdOrder2.id},
            {toppings:toppings,
            orderPrice: 40.0}
        )

        const orders = [createdOrder, createdOrder2]

        const total = SaleService.getTotal(orders)

        // action
        const createdSale = await SaleService.create({
            userId: createdUser.id,
            orders: orders,
            total: total
        })

        // assert
        expect(createdSale).toBeTruthy()
    })

    it('update', async () => {
        await clearDB()
        // setup
        const createdUser = await UserService.create({
            name: "manu",
            email:"manu",
            password:"manu",
            phone: 123
        })

        const createdBurger = await BurgerService.create({
            name:"burger1",
            price_simple: 20.0,
        })

        const createdBurger2 = await BurgerService.create({
            name:"burger2",
            price_simple:20.0
        })

        const createdTopping = await ToppingService.create({
            name:"topping",
            price: 10.0
        })

        let createdOrder2 = await OrderService.create({
            userId: createdUser.id,
            burgerId: createdBurger2.id,
            orderPrice:20.0
        })

        const createdToppingOrder = await ToppingOrderService.create({
            toppingId: createdTopping.id,
            quantity: 2,
            order: createdOrder2,
            toppingOrderPrice: 20.0
        })

        const toppings = [createdToppingOrder]

        const createdOrder = await OrderService.create({
            userId: createdUser.id,
            burgerId: createdBurger.id,
            orderPrice:20.0

        })

        createdOrder2 = await OrderService.update(
            {id:createdOrder2.id},
            {toppings:toppings,
            orderPrice: 40.0}
        )

        const orders = [createdOrder, createdOrder2]

        const total = SaleService.getTotal(orders)

        const createdSale = await SaleService.create({
            userId: createdUser.id,
            orders: orders,
            total: total
        })

        // action
        const sale = await SaleService.update(
            {id:createdSale.id},
            {received:true}
        )

        // assert
        expect(sale.received).toBeTruthy()
    })

    it('getSales', async() => {
        await clearDB()
        // setup
        const createdUser = await UserService.create({
            name:"manu",
            email:"manu",
            password:"manu",
            phone:123
        })

        const createdUser2 = await UserService.create({
            name:"manu",
            email:"manuu",
            password:"manu",
            phone:123
        })
    
        const createdSale = await SaleService.create({
            userId:createdUser.id,
            orders: undefined
        })

        const createdSale2 = await SaleService.create({
            userId: createdUser2.id,
            orders: undefined
        })

        // action
        const sales = await SaleService.getSales()

        //assert
        expect(sales).toBeTruthy()
    })
})   