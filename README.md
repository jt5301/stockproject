# Stock Project
App is deployed here: https://ttpstock.herokuapp.com/

(The boilerplate for this project is provided by Fullstack Academy and uses Express/Sequelize/React/Redux/Webpack.
github.com/FullstackAcademy/boilermaker. I forked this boilerplate to use on 2/14/2020. The project was due on 2/21/2020. I did some slight refactoring of the user-home component on 2/26/2020 because it was bothering me, and I updated the readme on 2/26/2020.). I am planning to continue this project to include styling, as well as an option to sell.

You are directed to sign up / log in once you are directed to the site. authentication happens on wrong username / password / combination:
![login](https://i.imgur.com/l67dvRr.png "signup")


Upon login, a user is greeted with their portfolio on the right, and a form to buy stocks on the left:
![user-Home](https://i.imgur.com/VygSFCQ.png 'user-home') 
If the value of the font is green, the current price of the stock is higher than the previous close price. If the value of the font is red, the current price of the stock is lower than the previous close price. The open price is almost always null when using the IEX API, so I opted to use previous close price as the comparison. 

The process to buy is:

1) enter a valid ticket
2) enter a valid quantity integer greated than zero
3) Error handling is implemented to check if 1 and 2 are valid. The buy button is enabled if so. The transaction will not go through if you do not have enough cash on hand to complete the purchase. If you do have enough, the purchase is successful, and your portfolio is updated immediately:

![lookup purchase](https://i.imgur.com/q6fAhmU.png 'lookup purchase') ![bought](https://i.imgur.com/2Mq8XvV.png 'bought')

The transactions tab in the nav bar will bring you to a list of all your transactions:

![transactions](https://i.imgur.com/G7YNyPm.png 'transactions')

I would like to continue this project soon to add additional functionality. updates will be documented here as they are added in the future. 

Thank you for reading!

