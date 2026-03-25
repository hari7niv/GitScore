# GigScore - Gig Performance Tracking Platform

GigScore is a full-stack application designed to help freelancers and gig workers track their performance across multiple platforms. Users can log gig activities, monitor earnings, track ratings, and generate comprehensive performance analytics all in one place.

##  Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Configuration](#configuration)
- [Building & Deployment](#building--deployment)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

##  Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT tokens
- **Multi-Platform Tracking**: Log gigs from multiple platforms (Upwork, Fiverr, Freelancer, etc.)
- **Activity Logging**: Record earnings, ratings, and job completions for each gig
- **Performance Dashboard**: Real-time overview of earnings, active days, and average ratings
- **Score Calculation**: Automated score computation based on gig performance metrics
- **Activity History**: View detailed activity logs for performance analysis
- **User Profile**: Manage user information and view personalized dashboard

### Technical Features
- REST API with Spring Boot
- JWT-based authentication
- CORS-enabled for cross-origin requests
- MySQL database integration
- Real-time dashboard updates
- Responsive React frontend

---

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.4
- **Language**: Java 21
- **Database**: MySQL 8.0
- **ORM**: Hibernate JPA
- **Authentication**: JWT (JJWT 0.11.5)
- **Security**: Spring Security with BCrypt password encoding
- **Build Tool**: Maven 3.8+

### Frontend
- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **UI Framework**: Tailwind CSS 3.4.17
- **HTTP Client**: Axios 1.13.6
- **Router**: React Router DOM 7.13.1
- **Node**: 18+

### Development Tools
- ESLint for code quality
- PostCSS for CSS processing
- Spring Boot DevTools for hot reload

---

##  Project Structure

```
GigScore/
├── backend/
│   └── gigscore/                          # Main Spring Boot application
│       ├── pom.xml                        # Maven configuration
│       ├── mvnw & mvnw.cmd               # Maven wrapper
│       └── src/
│           ├── main/
│           │   ├── java/com/org/gigscore/
│           │   │   ├── GigscoreApplication.java       # Spring Boot entry point
│           │   │   ├── Config/
│           │   │   │   ├── CorsConfig.java            # CORS configuration
│           │   │   │   ├── JWTutill.java              # JWT utility
│           │   │   │   └── SecurityConfig.java        # Spring Security config
│           │   │   ├── Controller/
│           │   │   │   ├── UserController.java        # User endpoints
│           │   │   │   ├── ActivityController.java    # Activity endpoints
│           │   │   │   ├── GigDataController.java     # Gig data endpoints
│           │   │   │   └── GigScoreController.java    # Score calculation endpoints
│           │   │   ├── Service/
│           │   │   │   ├── UserService.java           # User business logic
│           │   │   │   ├── ActivityService.java       # Activity business logic
│           │   │   │   ├── GigDataService.java        # Gig data business logic
│           │   │   │   ├── GigScoreService.java       # Score calculation logic
│           │   │   │   └── UserMetricsService.java    # Metrics computation
│           │   │   ├── Repository/
│           │   │   │   ├── UserRepository.java        # User DB operations
│           │   │   │   ├── ActivityRepository.java    # Activity DB operations
│           │   │   │   ├── GigDataRepository.java     # Gig data DB operations
│           │   │   │   └── GigScoreRepository.java    # Score DB operations
│           │   │   ├── Entity/
│           │   │   │   ├── User.java                  # User entity
│           │   │   │   ├── GigData.java               # Gig data entity
│           │   │   │   ├── Activity.java              # Activity entity
│           │   │   │   └── GigScore.java              # Score entity
│           │   │   └── DTO/
│           │   │       ├── LoginDTO.java              # Login request
│           │   │       ├── CreateUserRequest.java     # User creation request
│           │   │       ├── GigEventRequest.java       # Gig event request
│           │   │       ├── ActivityResponse.java      # Activity response
│           │   │       ├── ScoreResponse.java         # Score response
│           │   │       ├── GigSummaryResponse.java    # Gig summary response
│           │   │       └── UserDashboardResponse.java # Dashboard response
│           │   └── resources/
│           │       └── application.properties         # App configuration
│           └── test/
│               └── java/com/org/gigscore/
│                   └── GigscoreApplicationTests.java  # Unit tests
│
├── frontend/                              # React Vite application
│   ├── package.json                       # Dependencies & scripts
│   ├── vite.config.js                    # Vite configuration
│   ├── tailwind.config.js                # Tailwind CSS config
│   ├── postcss.config.js                 # PostCSS config
│   ├── eslint.config.js                  # ESLint configuration
│   ├── index.html                        # HTML entry point
│   └── src/
│       ├── main.jsx                      # React entry point
│       ├── App.jsx                       # Main App component with routing
│       ├── App.css                       # App styles
│       ├── index.css                     # Global styles
│       ├── pages/
│       │   ├── Login.jsx                 # Login page
│       │   ├── CreateUser.jsx            # User registration page
│       │   ├── Dashboard.jsx             # Main dashboard (gig overview)
│       │   ├── AddGig.jsx                # Add new gig page
│       │   └── Score.jsx                 # Performance score page
│       ├── components/
│       │   ├── Navbar.jsx                # Top navigation bar
│       │   ├── Sidebar.jsx               # Side navigation menu
│       │   ├── PlatformCard.jsx          # Platform display card
│       │   └── StatCard.jsx              # Statistics display card
│       ├── services/
│       │   ├── httpClient.js             # Axios HTTP client configuration
│       │   ├── userService.js            # User API calls
│       │   ├── gigService.js             # Gig API calls
│       │   ├── activityService.js        # Activity API calls
│       │   └── scoreService.js           # Score API calls
│       └── assets/                       # Images, icons, etc.
│
└── README.md                              # This file
```

---

##  Quick Start

### Prerequisites
- **Java**: 21 or higher
- **Maven**: 3.8 or higher
- **MySQL**: 8.0 or higher
- **Node.js**: 18 or higher
- **npm**: 9 or higher

### Prerequisites Check
```bash
java -version          # Should show Java 21+
mvn -version          # Should show Maven 3.8+
mysql --version       # Should show MySQL 8.0+
node -v               # Should show Node 18+
npm -v                # Should show npm 9+
```

---

##  Backend Setup

### Step 1: Database Configuration
Ensure MySQL is running:
```bash
# For Windows (if using MySQL service)
net start MySQL80

# For macOS (if using Homebrew)
brew services start mysql

# For Linux
sudo service mysql start
```

Create the database:
```bash
mysql -u root -p
> CREATE DATABASE gigscore;
> EXIT;
```

### Step 2: Configure Application Properties
Edit `backend/gigscore/src/main/resources/application.properties`:

```properties
spring.application.name=gigscore

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/gigscore
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Default Security Credentials
spring.security.user.name=admin
spring.security.user.password=admin
```

### Step 3: Build Backend
```bash
cd backend/gigscore

# Using Maven Wrapper (Windows)
mvnw.cmd clean package

# Using Maven Wrapper (macOS/Linux)
./mvnw clean package

# Or using installed Maven
mvn clean package
```

### Step 4: Run Backend
```bash
# Option 1: Using Maven
cd backend/gigscore
mvn spring-boot:run

# Option 2: Using pre-built JAR
java -jar backend/gigscore/target/gigscore-0.0.1-SNAPSHOT.jar
```

Backend will start on: `http://localhost:8080`

---

##  Frontend Setup

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure API Base URL (if needed)
Edit `frontend/src/services/httpClient.js`:
```javascript
const httpClient = axios.create({
  baseURL: "http://localhost:8080", // Change if backend is on different URL
});
```

### Step 3: Start Development Server
```bash
npm run dev
```

Frontend will start on: `http://localhost:5173` (or shown in terminal)

### Step 4: Build for Production
```bash
npm run build

# Preview production build
npm run preview
```

---

##  API Documentation

### Base URL
```
http://localhost:8080
```

### Authentication Flow
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

### 1. User Endpoints (`/api/users`)

#### Create User (Register)
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Response**: User object with userId

#### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Response**: JWT Token (string)

#### Get User Dashboard
```http
GET /api/users/{userId}
```

**Response**: UserDashboardResponse
```json
{
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "totalEarnings": 5000,
  "totalJobsCompleted": 25,
  "averageRating": 4.8,
  "activeDays": 45,
  "platforms": [...]
}
```

---

### 2. Gig Data Endpoints

#### Add New Gig
```http
POST /api/gigs
Content-Type: application/json

{
  "userId": 1,
  "platform": "Upwork",
  "amount": 250.00,
  "rating": 5.0
}
```

**Response**: Updated UserDashboardResponse

---

### 3. Activity Endpoints (`/api/activity`)

#### Get Recent Activities
```http
GET /api/activity/{userId}
```

**Response**: Array of ActivityResponse objects
```json
[
  {
    "id": 1,
    "userId": 1,
    "platform": "Upwork",
    "action": "completed_job",
    "amount": 250.00,
    "rating": 5.0,
    "timestamp": "2024-03-25T10:30:00"
  }
]
```

---

### 4. Score Endpoints (`/score`)

#### Get User Score
```http
GET /score/{userId}
```

**Response**: ScoreResponse
```json
{
  "userId": 1,
  "totalScore": 4.85,
  "earningsScore": 90,
  "performanceScore": 85,
  "consistencyScore": 88
}
```

---

## 🗄️ Database Schema

### User Table
```sql
CREATE TABLE user (
  user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  name VARCHAR(255)
);
```

### GigData Table
```sql
CREATE TABLE gig_data (
  gig_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  platform VARCHAR(100),
  total_earnings DOUBLE,
  jobs_completed INT,
  avg_rating DOUBLE,
  active_days INT,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);
```

### Activity Table
```sql
CREATE TABLE activity (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  platform VARCHAR(100),
  action VARCHAR(255),
  amount DOUBLE,
  rating DOUBLE,
  timestamp DATETIME,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);
```

### GigScore Table
```sql
CREATE TABLE gig_score (
  score_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  total_score DOUBLE,
  earnings_score DOUBLE,
  performance_score DOUBLE,
  consistency_score DOUBLE,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);
```

---

##  Authentication

### JWT Implementation
- **Library**: JJWT 0.11.5
- **Algorithm**: HmacSHA256
- **Token Expiration**: Configurable (see JWTutill.java)

### Security Features
- **Password Encoding**: BCrypt
- **CSRF Protection**: Disabled for API (configurable)
- **CORS**: Enabled for localhost:5173
- **HTTP Basic**: Disabled (JWT-based instead)

### CORS Configuration
```
Allowed Origins: http://localhost:5173
Allowed Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Allowed Headers: *
```

---

##  Configuration

### Backend Configuration Files

#### `application.properties`
Controls database connection, JPA settings, and security defaults:
```properties
spring.application.name=gigscore
spring.datasource.url=jdbc:mysql://localhost:3306/gigscore
spring.datasource.username=root
spring.datasource.password=Rpharish@1
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

#### Environment Variables (for production)
```bash
SPRING_DATASOURCE_URL=jdbc:mysql://prod-db-host:3306/gigscore
SPRING_DATASOURCE_USERNAME=prod_user
SPRING_DATASOURCE_PASSWORD=prod_password
JWT_SECRET=your_jwt_secret_key
```

### Frontend Configuration

#### `vite.config.js`
Vite build configuration with React plugin

#### `tailwind.config.js`
Tailwind CSS customization and theme settings

#### `eslint.config.js`
Code quality and linting rules

---

##  Building & Deployment

### Build Backend for Production
```bash
cd backend/gigscore
mvn clean package -DskipTests

# JAR will be created at:
# target/gigscore-0.0.1-SNAPSHOT.jar
```

### Build Frontend for Production
```bash
cd frontend
npm run build

# Production build will be created at:
# dist/
```

### Deploy Backend (Docker)
Create `Dockerfile` in backend directory:
```dockerfile
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY target/gigscore-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:
```bash
docker build -t gigscore:latest .
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql-host:3306/gigscore \
  -e SPRING_DATASOURCE_USERNAME=user \
  -e SPRING_DATASOURCE_PASSWORD=password \
  gigscore:latest
```

### Deploy Frontend (Static Hosting)
All major platforms support serving static files from `dist/`:
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repo and deploy
- **GitHub Pages**: Push `dist/` to `gh-pages` branch
- **Azure Static Web Apps**: Deploy with Azure CLI
- **AWS S3 + CloudFront**: Upload dist files to S3

---

##  Development

### Running Tests

#### Backend Tests
```bash
cd backend/gigscore
mvn test
```

#### Frontend Tests (if configured)
```bash
cd frontend
npm test
```

### Code Quality

#### ESLint (Frontend)
```bash
cd frontend
npm run lint
```

### Hot Reload Development

**Backend** (automatic with DevTools):
- Changes to Java files automatically reload
- Edit `application.properties` and restart

**Frontend** (automatic with Vite):
- Changes to React/CSS automatically reflect in browser
- HMR (Hot Module Replacement) enabled by default

---

##  API Usage Examples

### Register and Login Flow

#### 1. Register New User
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

Response: JWT token

#### 3. Get Dashboard
```bash
curl -X GET http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### 4. Add Gig
```bash
curl -X POST http://localhost:8080/api/gigs \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "platform": "Fiverr",
    "amount": 150.00,
    "rating": 4.8
  }'
```

#### 5. Get Activities
```bash
curl -X GET http://localhost:8080/api/activity/1
```

#### 6. Get Score
```bash
curl -X GET http://localhost:8080/score/1
```

---

## Troubleshooting

### Backend Issues

**Issue**: `Connection refused` to MySQL
- **Solution**: Verify MySQL is running, check connection credentials in `application.properties`

**Issue**: `Port 8080 already in use`
- **Solution**: Kill process on port 8080 or change port in `application.properties`:
  ```properties
  server.port=8081
  ```

**Issue**: `CORS error` from frontend
- **Solution**: Ensure frontend URL is added to `CorsConfig.java` allowed origins

### Frontend Issues

**Issue**: `GET http://localhost:8080 - 404`
- **Solution**: Verify backend is running, check API base URL in `httpClient.js`

**Issue**: `npm install fails`
- **Solution**: Clear npm cache and retry:
  ```bash
  npm cache clean --force
  npm install
  ```

**Issue**: `Vite port 5173 unavailable`
- **Solution**: Change port or kill process:
  ```bash
  npm run dev -- --port 5174
  ```

---

##  Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** changes: `git commit -m "Add your feature"`
4. **Push** to branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

### Code Standards
- **Backend**: Follow Spring Boot conventions, use proper exception handling
- **Frontend**: Use React hooks, functional components, proper prop typing
- **Commits**: Write clear, descriptive commit messages
- **Tests**: Add tests for new features or bug fixes

---

##  License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

##  Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [Your email/contact info]

---

##  Acknowledgments

- Spring Boot and Spring Security communities
- React and Vite communities
- MySQL and Hibernate documentation
- Tailwind CSS framework

---

##  Checklist Before Going Live

- [ ] Database migration scripts created
- [ ] Environment variables documented
- [ ] CORS origins updated for production URLs
- [ ] JWT secret key generated and secured
- [ ] Database backups configured
- [ ] Error logging implemented
- [ ] Frontend built and tested
- [ ] API endpoints tested with production data
- [ ] Security audit completed
- [ ] Performance testing completed
- [ ] Deployment pipeline set up
- [ ] Monitoring and alerts configured

---

**Last Updated**: March 25, 2026
**Maintainer**: GigScore Development Team
