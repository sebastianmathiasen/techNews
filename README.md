
# TechNews

TechNews is a web application that displays the latest news articles in the technology and science categories. It allows users to register, log in, and customize their settings. Registered users can also send messages through a contact form.


## Functionality

The application provides the following features:

- User Registration: Users can create an account by providing their name, last name, email, and password. Passwords are securely encrypted before storing them in the database.

- User Login: Registered users can log in to their accounts using their email and password. Sessions are used to keep users logged in across different pages.

- User Settings: Users can update their profile information, including their name, last name, and email. They can also change their password.

- News Display: The application retrieves the latest news articles from an external API and displays them on the homepage. Users can view the full article by clicking on a specific news item.

- Contact Form: Users can send messages to the application administrator through a contact form. The messages are sent via email using the Nodemailer library.


## Technologies Used

The application is built using the following technologies:

- Node.js: A JavaScript runtime environment that allows running JavaScript code on the server-side.

- Express.js: A web application framework for Node.js that simplifies the development of web applications.

- MongoDB: A NoSQL database used to store user information and contact messages.

- Mongoose: An Object Data Modeling (ODM) library for MongoDB, used to define database schemas and interact with the database.

- Handlebars: A templating engine used to generate dynamic HTML pages.

- Nodemailer: A library for sending emails from Node.js applications.

- Axios: A library used to make HTTP requests to retrieve news articles from an external API.


## Setup

To set up the application, follow these steps:

1. Clone the repository: git clone <repository-url>

2. Install dependencies: 
```bash
  npm install
```
3. Create a .env file in the root directory and configure the following environment variables:

- DB_URI: MongoDB Atlas connection URI.
- SESSION_SECRET: Secret key used to sign the session cookie.
- userMail: Email address used to send contact messages.
- passwordMail: Password for the email account used to send contact messages.

4. Start the application: 
```bash
  npm start
```
## Usage

After setting up the application and starting it, you can access it at http://localhost:3000 in your web browser.

- Register: Click on the "Register" link to create a new account. Fill in the registration form with your details and submit it.

- Login: If you already have an account, click on the "Login" link to log in. Enter your email and password and click "Login".

- View News: After logging in, you will be redirected to the news page, where you can see the latest news articles in the technology and science categories.

- Contact Form: Click on the "Contact" link to access the contact form. Fill in the form with your name, last name, email, and message, and click "Send Message" to send the message to the application administrator.

- User Settings: Click on the "Settings" link to access the user settings page. You can update your profile information and change your password.

- Logout: To log out of your account, click on the "Logout" link.


## Notes

- The application uses MongoDB Atlas as the database. Make sure to provide a valid MongoDB Atlas connection URI in the .env file.

- The application uses Nodemailer to send emails. Configure the userMail and passwordMail environment variables with the appropriate email credentials.

- The application retrieves news articles from an external API. The API key is hardcoded in the URL used for fetching news data. Consider obtaining your own API key and updating the url variable in the code.

- This is a simplified version of a web application and may not include all the necessary security measures for a production-ready system. Use it for educational purposes and consider implementing additional security measures when deploying it in a real environment.

