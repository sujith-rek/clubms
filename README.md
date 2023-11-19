# Club Management

## Description

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

## Features
### `  Admin  `
#### Events
- View all events
- Approve/Reject events

#### Room Booking
- Add rooms 
- Allocate rooms to clubs
- View all rooms

#### Budget Allocation
- Allocate budget to clubs
- View all budget allocations
- Approve/Reject budget approvals

### `  Club  `
#### Events
- Create events
- View all events
- Edit/Delete events

#### Room Booking
- Book rooms
- View all bookings
- Edit/Delete bookings

#### Budget Allocation
- Add budget requests

### `  CC  `
#### Events
- Approve/Reject events
- View all update to Events

### `  Student  `
#### Events
- View all approved events


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


## About code
### Frontend
- Individually created all the components and they are present in `components` folder, these components are combined together in `pages` folder to create pages.
- Except for `api` folder in `pages` folder, all the other folders are for frontend which are the user views of the website.
- `operations` folder has the functions which we use in frontend to communicate with backend APIs
- `styles` folder has the global styles and theme for the website and its pages

### Backend
- `api` folder in `pages` folder has all the backend APIs
- `services` folder has the functions which we use in backend to communicate with database
- Functions in `services` folder are called in `api` folder to perform the required operations and these functions act as procedures in database

### Database
- `/prisma/schema.prisma` has the database schema
- `/prisma/migrations` has the migrations of the database which are 