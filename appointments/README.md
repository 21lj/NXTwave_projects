# NirogGyan Healthcare Appointment Booking

A responsive web application built with React.js for booking doctor appointments.

## 🛠 Tools & Libraries Used
- React.js (Create React App)
- JavaScript
- React Router DOM
- Bootstrap 5
- Vercel (for deployment)

## ✨ Features
- Responsive doctor listing with search
- Doctor profile with availability
- Appointment booking form with validation
- Confirmation screen

## 🔧 Improvements with More Time
- Add real backend with Node.js + Express
- Store appointments in localStorage or database
- Add time slot selection based on actual availability
- Include email notifications
- Dark mode toggle
- Pagination for large doctor lists

## ⚠ Challenges Faced & Solutions
1. **Dynamic routing with React Router**: Initially had issues with `useParams`. Solved by ensuring correct route setup in `App.js`.
2. **Form validation**: Handled manually using state and error messages for simplicity.
3. **Responsive image layout**: Used Bootstrap grid and `object-fit` to keep doctor images consistent.
4. **State management without Redux**: Used local state effectively with `useState`, which was sufficient for this scale.

