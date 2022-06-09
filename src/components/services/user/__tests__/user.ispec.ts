import { clearDB } from "../../../../__tests__/setup.integration"
import { UserService } from "../../user"

describe('user', () => {
    it('login', async () => {
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
        await clearDB()
        expect(response.user.id).toBe(createdUser.id)
    })
    
    it('create', async () => {
        // setup

        // action
        const createdUser = await UserService.create({
            email: "manu",
            password: "manu",
            name: "manu",
            phone: 6782178
        })
    
        // assert
        await clearDB()
        expect(createdUser).toBeTruthy()
    })
    
    it('update', async() => {
        let createdUser = await UserService.create({
            email: "manuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",
            password: "manu",
            name: "manu",
            phone: 6782178
        })
        
        createdUser = await UserService.update({id:createdUser.id}, {password:"manuu"});
        
        await clearDB()
        expect(createdUser.password).toBe("manuu")
    })

    it('delete', async() => {
        // setup
        const createdUser = await UserService.create({
            name:"manu",
            email:"manuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",
            password:"manu",
            phone:123
        })

        await UserService.remove({id:createdUser.id})
        // action
        const user = await UserService.find({id:createdUser.id})

        //assert
        await clearDB()
        expect(user).toBeFalsy()
    })
})