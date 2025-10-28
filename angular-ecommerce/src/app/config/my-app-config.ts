export default{
    auth:{
        domain:"dev-cfal7uu5oc5upl30.us.auth0.com",
        clientId:"76cGNtiL9ezG8S7GtHG8gFqH0HkZebJp",
        authorizationParams:{
            redirect_uri:"https://localhost:4200/login/callback",
            audience:"http://localhost:8080"
        },
    },
    httpInterceptor:{
        allowedList:[
            'http://localhost:8080/api/orders/**',
            'http://localhost:8080/api/checkout/purchase'
        ],
    },
}
