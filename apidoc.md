//Page1 (search Page)

> List of city
 (GET) http://localhost:1009/location

 > https://lets-order.onrender.com/location

 > List of restaurants 
 ( GET) http://localhost:1009/restaurants

 > https://lets-order.onrender.com/restaurants

> restaurants wrt city
(GET) http://localhost:1009/restaurants?stateId=4

> https://lets-order.onrender.com/restaurants?stateId=4

>List of MealTypes
(GET) http://localhost:1009/mealTypes

> https://lets-order.onrender.com/mealTypes

//Page2 (listing Page)

Restaurants wrt meal
> (GET) http://localhost:1009/restaurants?mealId=4

> https://lets-order.onrender.com/restaurants?mealId=4

> http://localhost:1009/restaurants?stateId=1&mealId=3

>https://lets-order.onrender.com/restaurants?stateId=1&mealId=3

> Restaurants wrt to meal + cuisine
 (GET) http://localhost:1009/filter/2?cuisineId=4

 > https://lets-order.onrender.com/filter/2?cuisineId=4

> Restaurants sort wrt to meal+cost 
(GET) http://localhost:1009/filter/1?lcost=700&hcost=2000

> https://lets-order.onrender.com/filter/1?lcost=700&hcost=2000
 
 >Restaurants sort wrt to cost
 (GET) http://localhost:1009/filter/2?cuisineId=1&sort=-1

 > https://lets-order.onrender.com/filter/2?cuisineId=1&sort=-1

 Pagination
http://localhost:1009/filter/2?cuisineId=1&skip=2&limit=2

> https://lets-order.onrender.com/filter/2?cuisineId=1&skip=2&limit=2

//Page3 (details Page)

> Restaurants Details
(GET) http://localhost:1009/details/6405d49965785f6a71c2b3cd
> Menu wrt restaurants
(GET) http://localhost:1009/menu/4

> https://lets-order.onrender.com/menu/4

//Page4 (placeOrder Page)

> Menu details 
(POST) http://localhost:1009/menuItem
{"id":[2,32,4]}

> Place Order
(POST) http://localhost:1009/placeOrder

//Page5 (orderListing Page)

> List All Order Placed
(GET) http://localhost:1009/orders

> https://lets-order.onrender.com/orders

> Order wrt email
(GET) http://localhost:1009/orders?email=anchal@gmail.com

> https://lets-order.onrender.com/orders?email=anchal@gmail.com

> Delete Order
(Delete) http://localhost:1009/removeOrder

>Update Order
(PUT) http://localhost:1009/updateOrders

