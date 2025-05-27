# Simple NestJS - Mongo - RBAC Boilerplate

A **SIMPLE** boilerplate project using **NestJS** and **MongoDB**, built with **Clean Architecture** in mind. This template promotes scalable, maintainable backend development with support for **RBAC (Role-Based Access Control)** and modular code organization.

## 🔥 Features

- ⚙️ **NestJS**: Progressive Node.js framework
- 🧩 **MongoDB** with Mongoose ODM
- 🧼 **Clean Architecture** with layered separation:
    - **Controllers** – handle routing and input
    - **Services** – contain business logic
    - **Repositories** – abstract data access
    - **Schemas/Entities** – define data models
- 🔐 **RBAC (Role-Based Access Control)**:
    - Easily protect routes with role decorators
    - Assign permissions by user roles
- 🧰 Organized module-based structure
- 🌐 Environment config via `.env` support
- 📦 Easily extensible for microservices or monoliths

## 🏗️ Clean Architecture Overview

This boilerplate implements **Clean Architecture** (also known as Hexagonal Architecture) to ensure:

- **Separation of Concerns**: Each layer has a specific responsibility
- **Framework Independence**: Business logic is isolated from external frameworks
- **Testability**: Easy to unit test each component independently
- **Maintainability**: Code is organized in a scalable and readable structure

### Architecture Layers

```
src/
├── modules/              # Feature modules (Clean Architecture modules)
│   ├── auth/
│   │   ├── controllers/  # HTTP layer - handles requests/responses
│   │   ├── services/     # Business logic layer
│   │   ├── repositories/ # Data access layer
│   │   ├── dto/          # Data transfer objects
│   │   ├── entities/     # Domain entities
│   │   └── auth.module.ts
│   └── users/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── dto/
│       ├── entities/
│       └── users.module.ts
├── common/               # Shared utilities and configurations
├── config/               # Application configuration
└── main.ts              # Application entry point
```

## ✨ Key Features

### 🎯 Clean Architecture Implementation
- **Modular Structure**: Each feature is encapsulated in its own module
- **Controller Layer**: Handles HTTP requests and responses
- **Service Layer**: Contains business logic and use cases
- **Repository Layer**: Manages data persistence and retrieval
- **Entity Layer**: Defines domain models and business rules

### 🛠️ Technical Stack
- **NestJS**: Progressive Node.js framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **TypeScript**: Type-safe development
- **JWT Authentication**: Secure user authentication
- **Validation**: Request/response validation with class-validator
- **Documentation**: Auto-generated API documentation with Swagger

### 🔒 Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Request validation and sanitization
- CORS configuration
- Rate limiting

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/jaydenhnguyen/nestjs-mongo-boilerplate.git
cd nestjs-mongo-boilerplate
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp .env.example .env
```

Configure your environment variables:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/nestjs-boilerplate

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Application
PORT=3000
NODE_ENV=development
```

4. **Run the application**
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## 📁 Project Structure

### Module Organization
Each feature module follows the clean architecture pattern:

```typescript
// Example: Users Module Structure
users/
├── controllers/
│   └── users.controller.ts     # HTTP layer
├── services/
│   └── users.service.ts        # Business logic
├── repositories/
│   └── users.repository.ts     # Data access
├── dto/
│   ├── create-user.dto.ts      # Input validation
│   └── user-response.dto.ts    # Output formatting
├── entities/
│   └── user.entity.ts          # Domain model
└── users.module.ts             # Module configuration
```

### Controller Layer
Handles HTTP requests and delegates to services:

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

### Service Layer
Contains business logic and coordinates between layers:

```typescript
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Business logic here
    return this.usersRepository.create(createUserDto);
  }
}
```

### Repository Layer
Manages database operations:

```typescript
@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: CreateUserDto): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }
}
```

## 🔧 Configuration

### Database Configuration
Configure MongoDB connection in `src/config/database.config.ts`:

```typescript
export const databaseConfig = {
  uri: process.env.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
```

### Module Registration
Register new modules in `app.module.ts`:

```typescript
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(databaseConfig),
    AuthModule,
    UsersModule,
    // Add your new modules here
  ],
})
export class AppModule {}
```

## 🛡️ Best Practices Implemented

### Clean Architecture Principles
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Single Responsibility**: Each class has one reason to change
- **Interface Segregation**: Clients depend only on interfaces they use
- **Open/Closed Principle**: Open for extension, closed for modification

### NestJS Best Practices
- **Modular Design**: Features organized in separate modules
- **Dependency Injection**: Loose coupling between components
- **Guards and Interceptors**: Cross-cutting concerns handled elegantly
- **DTO Validation**: Strong input validation with decorators

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-strong-production-secret
PORT=3000
```

## 📈 Scaling Considerations

The clean architecture enables easy scaling:

- **Horizontal Scaling**: Stateless services can be replicated
- **Database Scaling**: Repository pattern allows easy database switching
- **Microservices**: Modules can be extracted into separate services
- **Testing**: Each layer can be tested independently

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the clean architecture patterns
4. Write tests for your changes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jayden H. Nguyen**
- GitHub: [@jaydenhnguyen](https://github.com/jaydenhnguyen)
- Repository: [nestjs-mongo-boilerplate](https://github.com/jaydenhnguyen/nestjs-mongo-boilerplate)

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Follows [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) principles
- Inspired by Uncle Bob's architectural guidelines

---

**Ready to build scalable applications with clean, maintainable code? This boilerplate provides the perfect foundation with its clean architecture implementation featuring separate modules, controllers, services, and repositories.**