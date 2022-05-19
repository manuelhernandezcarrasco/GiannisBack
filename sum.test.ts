import { BurgerService } from "components/services/burger"
import { OrderService } from "components/services/order"
import { UserService } from "components/services/user"

test('login', async () => {
    // setup
    const createdUSer = await UserService.create({
        email: "manu",
        password: "manu",
        name: "manu",
        phone: 6782178
    })

    // action
    const response = await UserService.login("manu", "manu")

    // assert
    expect(response.user.id).toBe(createdUSer.id)
})

test('create', async () => {
    // setup
    const createdUSer = await UserService.create({
        email: "manu",
        password: "manu",
        name: "manu",
        phone: 6782178
    })

    // action
    const user = await UserService.find({email: "manu"})

    // assert
    expect(user).toBeTruthy()
})

test('update user', async() => {
    const createdUSer = await UserService.create({
        email: "manu",
        password: "manu",
        name: "manu",
        phone: 6782178
    })
    
    const user = await UserService.update({id:createdUSer.id}, {password:"manuu"});
    
    expect(user).toBeTruthy()
})

test('getBurgers', async() => {
    const burgers = await BurgerService.getBurgers()
    expect(burgers).toBeTruthy()
})

test('place order', async() => {
    const createdUSer = await UserService.create({
        email: "manu",
        password: "manu",
        name: "manu",
        phone: 6782178
    })

    const createdBurger = await BurgerService.create({
        name: "burger",
    })

    const order = await OrderService.create({burgerId:createdBurger.id, userId:createdUSer.id,orderPrice:0})

    expect(order).toBeTruthy()
})
