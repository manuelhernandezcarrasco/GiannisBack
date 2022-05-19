import { clearDB } from "../../../../__tests__/setup.integration"
import { UserService } from "../../user"

describe('user', () => {
    it('login', async () => {
        await clearDB()
        // setup
        const createdUser = await UserService.create({
            email: "manu",
            password: "manu",
            name: "manu",
            phone: 6782178
        })
    
        // action
        const response = await UserService.login("manu", "manu")
    
        // assert
        expect(response.user.id).toBe(createdUser.id)
    })
    
    it('create', async () => {
        await clearDB()
        // setup

        // action
        const createdUser = await UserService.create({
            email: "manu",
            password: "manu",
            name: "manu",
            phone: 6782178
        })
    
        // assert
        expect(createdUser).toBeTruthy()
    })
    
    it('update', async() => {
        await clearDB()
        const createdUser = await UserService.create({
            email: "manu",
            password: "manu",
            name: "manu",
            phone: 6782178
        })
        
        const user = await UserService.update({id:createdUser.id}, {password:"manuu"});
        
        expect(user.password).toBe("manuu")
    })

    it('delete', async() => {
        await clearDB()
        // setup
        const createdUser = await UserService.create({
            name:"manu",
            email:"manu",
            password:"manu",
            phone:123
        })

        await UserService.remove({id:createdUser.id})
        // action
        const user = await UserService.find({id:createdUser.id})

        //assert
        expect(user).toBeFalsy()
    })
})