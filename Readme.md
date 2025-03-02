# Cat Backend

## Project Setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ashwani8090/code-caty-backend
   ```
2. Navigate to the project directory:
   ```bash
   cd code-caty-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of your project and add the required variables:

```
JWT_TOKEN=your_jwt_token
JWT_REFRESH_TOKEN=your_jwt_refresh_token
MONGO_URI=your_mongo_uri
JWT_EXPIRES_IN=your_jwt_expiry
```

**Note:** Make sure to keep your `.env` file secure and never commit it to version control.

To generate secure tokens, use the following command:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Running the Project

Start the development server:

```bash
npm start
```

### Project Structure

- `index.js`: Entry point of the application.
- `routes/`: Contains route definitions.
- `models/`: Mongoose models.
- `controllers/`: Request handlers.

### Dependencies

The project uses the following dependencies:

- `express`: Web framework for Node.js
- `mongoose`: MongoDB ODM
- `jsonwebtoken`: JWT token handling
- `bcrypt`: Password hashing
- `dotenv`: Environment variable management
- `joi`: Schema validation
- `nodemon`: Development tool for auto-restarting the server

### License

This project is licensed under the ISC License.
