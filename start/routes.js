'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')
const User = use('App/Models/User')

Route
.get('/' , ({request, response, view}) =>{
    return view.render('welcome')
})
.as('welcome')



Route.get("/login", ({request, response, view}) => {
    return view.render("login")
})
.as('login')
Route
.post('/login' , async ({request, response}) => {
    let username = await request.input('username')
    let password = await request.input('password')
    // search the database for the username and password

    response.send('We have recieve your form submission.')

    console.log(username, password)
})


Route.get("/register", ({request, response, view}) =>{
    return view.render("register")
})
.as('register')

Route.post('/register', async ({request, response}) =>{
    let username = await request.input('username')
    let password = await request.input('password')
    let email = await request.input('email')

    console.log(username, password, email)


    const user = new User()
    user.username = username
    user.password = password
    user.email = email
    
    console.log(await user.save())
    return await response.redirect('login')
    

}).validator('StoreUser')

