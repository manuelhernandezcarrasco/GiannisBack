import swaggerJSDoc, {
    OAS3Definition,
    OAS3Options
} from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Sirius Burgers",
        version: "1.0.0"
    },
    servers: [
        {
        url: "http://localhost:5000",
        },
    ],
    components: {
        securitySchemes: {
            withAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            user: {
                type: "object",
                required: ["name", "email", "password", "phone"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                    phone: {
                        type: "number",
                    },
                },
            },
            burger: {
                type: "object",
                required: ["name", "price"],
                properties: {
                    name: {
                        type: "string",
                    },
                    price: {
                        type: "decimal",
                    },
                },
            },
            topping: {
                type: "object",
                required: ["name", "price"],
                properties: {
                    name: {
                        type: "string",
                    },
                    price: {
                        type: "string",
                    },
                },
            },
            toppingOrder: {
                type: "object",
                required: ["toppingId", "quantity", "orderdId", "toppingOrderPrice"],
                properties: {
                    toppingId: {
                        type: "string",
                    },
                    quantity: {
                        type: "number",
                    },
                    orderId: {
                        type: "string",
                    },
                    toppingOrderPrice: {
                        type: "decimal"
                    },
                },
            },
            order: {
                type: "object",
                required: ["burgerId", "userId", "orderPrice", "toppings"],
                properties: {
                    burgerId: {
                        type: "string",
                    },
                    userId: {
                        type: "string",
                    },
                    orderPrice: {
                        type: "decimal",
                    },
                    toppings: {
                        type: "toppingOrder[]",
                    },
                },
            },
            sale: {
                type: "object",
                required: ["userId", "total", "orders"],
                properties: {
                    userId: {
                        type: "string",
                    },
                    total: {
                        type: "decimal",
                    },
                    orders: {
                        type: "Order[]",
                    },
                },
            },
            createAdmin: {
                type: "object",
                required: ["userId"],
                properties: {
                    userId: {
                        type: "string",
                    },
                },
            },
            getUsers: {
                type: "object",
                required: ["pattern", "skip"],
                properties: {
                    pattern: {
                        type: "string",
                    },
                    skip: {
                        type: "number",
                    },
                },
            },
            getSales: {
                type: "object",
                required: ["pattern", "skip", "accepted", "sent", "received", "sort"],
                properties: {
                    pattern: {
                        type: "string",
                    },
                    skip: {
                        type: "number",
                    },
                    accepted: {
                        type: "boolean",
                    },
                    sent: {
                        type: "boolean",
                    },
                    received: {
                        type: "boolean",
                    },
                    sort: {
                        type: "boolean",
                    },
                },
            },
            manageSale: {
                type: "object",
                required: ["saleId"],
                properties: {
                    saleId: {
                        type: "string",
                    },
                },
            },
            patchUser: {
                type: "object",
                required: ["name", "phone", "password"],
                properties: {
                    name: {
                        type: "string",
                    },
                    phone: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            deleteBurger: {
                type: "object",
                required: ["burgerId"],
                properties: {
                    burgerId: {
                        type: "string",
                    },
                },
            },
            modifyBurger: {
                type: "object",
                required: ["burgerId", "description", "price_simple", "price_double", "price_veggie"],
                properties: {
                    burgerId: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                    price_simple: {
                        type: "decimal",
                    },
                    price_double: {
                        type: "decimal",
                    },
                    price_veggie: {
                        type: "decimal",
                    },
                },
            },
            modifyOrder: {
                type: "object",
                required: ["orderId", "orderPrice"],
                properties: {
                    orderId: {
                        type: "string",
                    },
                    orderPrice: {
                        type: "decimal",
                    },
                },
            },
            deleteOrder: {
                type: "object",
                required: ["orderId"],
                properties: {
                    orderId: {
                        type: "string",
                    },
                },
            },
            patchTopping: {
                type: "object",
                required: ["toppingId", "price"],
                properties: {
                    toppingId: {
                        type: "string",
                    },
                    price: {
                        type: "string",
                    },
                },
            },
            deleteTopping: {
                type: "object",
                required: ["toppingId"],
                properties: {
                    toppingId: {
                        type: "string",
                    },
                },
            },
            modifyToppingOrder: {
                type: "object",
                required: ["toppingOrderId", "quantity", "toppingOrderPrice"],
                properties: {
                    toppingOrderId: {
                        type: "string",
                    },
                    quantity: {
                        type: "string",
                    },
                    toppingOrderPrice: {
                        type: "decimal",
                    },
                },
            },
            deleteToppingOrder: {
                type: "object",
                required: ["toppingOrderId"],
                properties: {
                    toppingOrderId: {
                        type: "string",
                    },
                },
            },
            loginUser: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            validateUser: {
                type: "object",
                required: ["code"],
                properties: {
                    code: {
                        type: "string",
                    },
                },
            },
        },
    },
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: [
        './src/components/controller/authAdmin/authAdmin.router.ts',
        './src/components/controller/authUser/authUser.router.ts', 
        './src/components/controller/burger/burger.router.ts', 
        './src/components/controller/menu/menu.router.ts', 
        './src/components/controller/order/order.router.ts', 
        './src/components/controller/sale/sale.router.ts', 
        './src/components/controller/topping/topping.router.ts', 
        './src/components/controller/topping-order/topping-order.router.ts', 
        './src/components/controller/user/user.router.ts'
    ],
}

export default swaggerJSDoc(swaggerOptions);