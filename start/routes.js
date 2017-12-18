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
const Offer = use('App/Models/Offer')

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

//*********************Offers Page *****************/

Route.get('/currentoffers', async ({request, response, view}) =>{
    const offers = (await Offer.query({}).fetch()).toJSON()
    return view.render('offers', {offers})
}).as('currentoffers')



//****************** Add Offers Page ***************/
Route.get('/addoffers', async ({request, response, view}) =>{
    return view.render('addoffer')
}).as('addoffer')


Route.post('/addoffers', async({request, response}) =>{
    let name = await request.input('name')
    let price = await request.input('price')

    const offer = new Offer()
    offer.name = name
    offer.price = price
    
    console.log(await offer.save())
    return await response.redirect('offers')
    

}).validator('StoreOffer')


//******************** Delete Offers ***************/
Route.get('/deleteoffers', async ({request, response, view}) =>{
    const offers = (await Offer.query({}).fetch()).toJSON()
    return view.render('deleteoffer', {offers})
}).as('deleteoffers')


Route.post('/deleteoffers', async({request, response, view, auth}) =>{
    const value = await request.input('ID')
    const query = await Offer
    .query()
    .where('id', value)
    .delete()
    
    console.log(value)
    return response.redirect('/deleteoffers')
})


//****************** Enquire Page ***************/
Route.get('/enquire', async({request, response, view}) =>{
    return view.render('enquire')
}).as('enquire')









//*****************Test page  **************/

Route.get('/test', ({request, response, view}) =>{
    return view.render('test')
})
.as('test')


//******************* 404 Page **************/


Route.get('/404', ({request,response, view}) =>{
    return view.render('404')
}).as('404')


Route.post('/404', ({request, response}) =>{
    return response.redirect('/')
})