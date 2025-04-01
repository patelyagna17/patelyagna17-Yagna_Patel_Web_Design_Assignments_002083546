# Yagna_Patel_002083546

Assignment 9/
├── backend/
│   ├── server.js               # Main backend server entry point
│   ├── package.json            # Backend dependencies and scripts
│   ├── models/                 # MongoDB schemas for User and Image
│   └── services/
│       └── service.js          # User and image service logic
├── frontend/
│   ├── public/                 # Static public assets
│   └── src/
│       └── components/         # React components (Home, About, Jobs, Contact, etc.)
│           ├── Home.js, Home.css
│           ├── AboutUs.js, about.css
│           ├── Jobs.js, Jobs.css
│           ├── Contact.js, contact.css
│           ├── Company.js, Company.css
│           ├── Login.js, Login.css
│           └── Card.js, JobCard.js, etc.
├── README.md
└── .gitignore

Features:-

1. Login & Session Management
Login page using stored usernames/passwords.

Axios used for session management.

Logout functionality for ending sessions securely.

2. Routing with React
Implemented using react-router-dom, the app includes:

Home

About

Job Listings

Contact

Company Showcase

Each page is a separate component inside src/components.

3. Dynamic Job Listings
Rendered from a jobPosts object using map().

Displays:

Job Title

Description

Last Updated

Apply Link

4. Company Showcase (Image Gallery)
Images are fetched from the backend (/backend/services/service.js logic).

Displays company names with logos/images.

Uses Buffer to Base64 conversion for rendering.

5. UI & Styling
Basic styling using CSS.

Material UI components (optional for this assignment but prepared):

Cards

Buttons

Navigation Bars

Forms

🌐 Navigation
/ - Home

/about - About Us

/jobs - Job Listings

/contact - Contact Page

/companies - Company Showcase

/login - Login Page


