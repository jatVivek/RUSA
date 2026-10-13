# Synthetix Studio Portfolio API Server

High-performance, dynamic portfolio backend and CMS engine built with Node.js, Express, MongoDB with Mongoose, JWT (httpOnly cookie authentication), Zod validation, and an embedded persistence fallback.

---

## Architecture Overview

- **Language:** JavaScript (Node.js 20+, ES Modules)
- **Framework:** Express 4.x
- **Database:** MongoDB via Mongoose with embedded resilient JSON storage fallback
- **Authentication:** JWT (httpOnly cookies for \`accessToken\` and \`refreshToken\` + Bearer headers) with bcrypt password hashing
- **Input Validation:** Zod schemas on all endpoints
- **Security:** Helmet, CORS, express-rate-limit, sanitize helpers
- **File Uploads:** Multer with mime-type and 5MB size limits
- **Testing:** Jest + Supertest

---

## Directory Structure

\`\`\`
/server
├── src
│   ├── config/          # Environment and Database configuration
│   ├── controllers/     # Auth, Public, Admin, and Upload controllers
│   ├── middleware/      # Auth, Zod validation, Rate limiter, Error handler, Upload
│   ├── models/          # Mongoose schemas and data models
│   ├── routes/          # Auth, Public, and Admin routing tables
│   ├── seed/            # Seed data and database seeder runner
│   ├── utils/           # JWT, Bcrypt, Mailer, and Response helpers
│   ├── validators/      # Zod validation schemas
│   └── server.js        # Standalone Express application entry point
├── tests/               # Jest & Supertest integration tests
├── uploads/             # Static file uploads directory
├── data/                # Embedded database persistence cache
├── jest.config.js       # Jest testing configuration
├── .eslintrc.json       # ESLint rules
├── .prettierrc          # Prettier formatting rules
└── README.md            # API documentation
\`\`\`

---

## API Routes Summary

### Public Routes (\`GET /api/public/*\`, cacheable, rate-limited)
| Method | Endpoint | Description |
|---|---|---|
| \`GET\` | \`/api/public/site\` | Returns settings, theme, active sections, socials, and all active content in a single cacheable payload |
| \`GET\` | \`/api/public/blogs\` | Returns all active, published engineering blog posts |
| \`GET\` | \`/api/public/blogs/:slug\` | Returns single blog post by slug |
| \`GET\` | \`/api/public/products\` | Returns all active showcase products |
| \`GET\` | \`/api/public/offer\` | Returns active offer banner (returns \`204\` if inactive or outside date range) |
| \`POST\` | \`/api/public/contact\` | Submits project brief with rate limiting, email notification, and validation |

### Auth Routes (\`POST /api/auth/*\`)
| Method | Endpoint | Description |
|---|---|---|
| \`POST\` | \`/api/auth/login\` | Authenticates admin, returns tokens and sets httpOnly cookies |
| \`POST\` | \`/api/auth/logout\` | Clears authentication cookies |
| \`POST\` | \`/api/auth/refresh\` | Issues new access token from refresh token |
| \`POST\` | \`/api/auth/change-password\` | Updates admin password (requires auth) |
| \`GET\` | \`/api/auth/me\` | Returns authenticated profile |

### Admin Routes (\`ALL /api/admin/*\`, JWT Protected)
| Method | Endpoint | Description |
|---|---|---|
| \`GET\` | \`/api/admin/:resource\` | List all items for any registered model |
| \`GET\` | \`/api/admin/:resource/:id\` | Retrieve single item by ID |
| \`POST\` | \`/api/admin/:resource\` | Create new entry |
| \`PUT\` | \`/api/admin/:resource/:id\` | Update entry |
| \`DELETE\` | \`/api/admin/:resource/:id\` | Delete entry (mandatory sections protected) |
| \`PATCH\` | \`/api/admin/:resource/:id/toggle\` | Toggle \`isActive\` on/off |
| \`PATCH\` | \`/api/admin/:resource/reorder\` | Batch reorder items \`[{ id, order }]\` |
| \`POST\` | \`/api/admin/theme/reset\` | Reset Theme to default Obsidian Aurora palette |
| \`POST\` | \`/api/admin/upload\` | Upload image with size and type checks |

---

## Running the Server & Tests

\`\`\`bash
# Run database seed
npm run seed

# Run test suite (auth, toggle, offer rules)
npm run test:server

# Run development server
npm run dev
\`\`\`
