# BiteBeat Backend

Welcome to the backend repository of BiteBeat - a food ordering application. This backend repository contains the server-side code responsible for handling requests from the frontend, managing the database, and facilitating authentication and authorization processes.

## Technologies Used

- **Node.js:** Backend runtime environment.
- **Express.js:** Web application framework for Node.js used for building APIs.
- **MongoDB:** NoSQL database for storing user data, restaurant information, orders, etc.
- **JWT (JSON Web Tokens):** Used for authentication and creating secure access tokens.
- **bcrypt:** Library for hashing passwords before storing them in the database.
- **Mongoose:** MongoDB object modeling tool for Node.js.

## Setup Instructions

To set up and run the BiteBeat backend locally, follow these steps:

1. **Clone the Repository:**


   ```bash
   git clone https://github.com/Utsavrai1/bitebeat-backend.git
   cd bitebeat-backend

2. **Install Dependencies:**


   ```bash
   npm install

3. **Set Environment Variables:**  Create a `.env` file in the root directory and set the following variables:


   ```bash
    MONGODB_CONNECTION_STRING=<YOUR-MONGODB_CONNECTION_STRING>
    PORT=3001
    
    #CustomAuth
    SECRET_KEY = <YOUR-SECRET_KEY>

    #NODEMAILER
    PASSWORD = <YOUR-SMTP-PASSWORD>
    EMAIL = <YOUR-SMTP-EMAIL>
    
    #Cloudinary
    CLOUDINARY_CLOUD_NAME=<YOUR-CLOUDINARY_CLOUD_NAME>
    CLOUDINARY_API_KEY=<YOUR-CLOUDINARY_API_KEY>
    CLOUDINARY_API_SECRET=<YOUR-CLOUDINARY_API_SECRET>
   
4. **Run the Application:**


    ```bash
    npm run dev

5 **Access API Endpoints:** Once the server is running, you can access the API endpoints through `http://localhost:3001`.

