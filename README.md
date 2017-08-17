# Recipe Book

·	The app is designed to help user create/edit selected recipes on the website to his/her own recipe book, and also to help guests select ingredients from the recipe and purchase them. The front end is based on Angular 2, and the backend is based on Node.js/Express.js. User credentials and recipes as well as orders placed by guests are stored in MongoDB database. The app is deployed on AWS Elastic beanstalk and the database is deployed on mLab. 

·	Each user can create, edit and delete his/her own recipe, and view other users’ recipes. User token is fetched from database to local storage once successfully logged in. After finishing a recipe, the user can save it temporarily in browser or directly push it to database. If user accidentally deleted a recipe in browser, he/she can retrieve that from database as well. User authentication is processed by JWT, which also serves as route guard in backend. When viewing a recipe, guests can push the ingredients to shopping cart for purchase. The payment is processed through Stripe API and the orders are stored in database with a unique payment id.

The app is deployed on AWS: http://angular2deployment-env.rryzmkhw72.us-east-2.elasticbeanstalk.com/
Test log in email: max@gmail.com
Test password: 1234

In progress...
