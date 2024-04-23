# Club Management

## Description
The Club Management System is a modern solution designed to streamline and simplify the management processes for over 60 clubs and societies within our university. By replacing the current manual system with an automated platform, the project introduces user roles (Admin, Cultural Committee Member, and Clubs) to optimize event approval workflows, enhance communication, and provide a centralized platform tailored to the distinct needs of each user level. This system aims to improve overall efficiency, reduce manual effort, and foster better collaboration among club members and university staff, creating a more seamless experience for managing and participating in club-related activities.

## Installation and Usage

Install node_modules

```
npm install
```

add .env file which contains `secret` and `database` variables then
Run the server

```
npm run dev
```

## Technologies Used

### Frontend

- React
- Next.js
- Chakra UI
- SCSS

### Backend

- Node.js
- Prisma
- PostgreSQL

## Project Structure

### Frontend

- The `components` folder contains individually created components.
- The `pages` folder contains the user views of the website.
- The `api` folder in pages contains backend APIs.
- The `operations` folder has functions for frontend-backend communication.
- The `styles` folder has global styles and themes.

### Backend

- The `api` folder in pages contains backend APIs.
- The `services` folder contains functions for backend-database communication.

### Database

- `/prisma/schema.prisma` defines the database schema.
- `/prisma/migrations` contains database migration files.

## Features

### `  Admin  `

#### Page Routes
1. `/auth/admin/adminRegister` - Admin Registration (Route is developed only for development purposes)
2. `/auth/admin/adminLogin` - Admin Login
3. `/admin/adminHomePage` - Admin Dashboard

#### Events

- View all events
- Approve/Reject events

#### Room Booking

- Add rooms
- Allocate rooms to clubs
- View all rooms
- Remove Room
- Pending Room Approvals
- Approved Room Approvals
- Rejected Room Approvals

#### Budget Allocation

- Allocate budget to clubs
- View all budget allocations
- Approve/Reject budget approvals
- Approved
- Rejected
- Club budget details

### `  Club  `

### Page Routes
1. `/auth/club/clubRegister` - Club Registration (Route is developed only for development purposes)
2. `/auth/club/clubLogin` - Club Login
3. `/club/clubHomePage` - Club Dashboard

#### Events

- Create events
- View all events
- Edit/Delete events
- Admin Pending Events
- Admin Approved Events
- Admin Rejected Events
- CC Pending Events
- CC Approved Events
- CC Rejected Events

#### Room Booking

- Book rooms
- View all bookings
- Edit/Delete bookings
- Pending Room Approvals
- Approved Room Approvals

#### Budget Allocation

- Add budget requests
- Approved Requests
- Pending Requests
- Rejected Requests
- Club budget details

### `  CC  `
#### Page Routes
1. `/auth/cc/ccRegister` - CC Registration (Route is developed only for development purposes)
2. `/auth/cc/ccLogin` - CC Login
3. `/cc/ccHomePage` - CC Dashboard

- Pending Events (To be approved/rejected)
- Approved Events
- Rejected Events

### `  Student  `
#### Page Routes
1. `/auth/student/studentRegister` - Student Registration (Route is developed only for development purposes)
2. `/auth/student/studentLogin` - Student Login
3. `/student/studentHomePage` - Student Dashboard


- View all approved events

## Contributors
| Name | Roll Number | SNU ID|
|------|-------------|-------|
|Aryan Sethia| 2110110754| as188|
|Chaitanya Tandon| 2110110171|ct765|
|Sujith|2110110400|ps335|

