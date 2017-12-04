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

Route
.get('/' , ({request, response, view}) =>{
    return view.render("welcome")
})
.as("welcome")



Route.get("/login", ({request, response, view}) => {
    return view.render("login")
})
.as('login')

Route
.post('/login' , async ({request, response}) => {
    let username = await request.input('username')
    let password = await request.input('password')

    // search the database for the username and password

    console.log(username, password)
})