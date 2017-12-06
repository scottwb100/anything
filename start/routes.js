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

//************login ********************/

Route.get("/login", ({request, response, view}) => {
    return view.render("login")
})
.as('login')
Route
.post('/login' , async ({request, response, auth}) => {
    let email = await request.input('email')
    let password = await request.input('password')
    // search the database for the username and password

    await auth.attempt(email, password)
    return await response.redirect('/')

})

//**************Log Out *****************/

Route
.get('/logout' , async ({request, response, auth}) => {
    await auth.logout()
    return await response.redirect('/')
}).as('logout')




// ************** Register *************/
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

//******************Offers Page ******************/
Route.get('/offers', async ({request, response, view, auth})=>{
try{
    await auth.check()
    console.log(await auth.check())
    return view.render('offers')
}catch(error){
    console.log(error)
    return await response.redirect('/login')
}

}).as('offers')





//*****************Test page  **************/

Route.get('/test', ({request, response, view}) =>{
    return view.render('test')
})
.as('test')