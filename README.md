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


