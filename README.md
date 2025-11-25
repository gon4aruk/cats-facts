# Cats facts

## 🛠️ Local Deployment Guide

### Step 1: Clone the Repository
```
git clone https://github.com/gon4aruk/cats-facts.git cats-facts
cd cats-facts
```

### Step 2: Install Dependencies
```
npm install
```

### Step 3: Run the Application

Compiles and hot-reloads for development
```
npm run serve
```

Compiles and minifies for production
```
npm run build
```

Lints and fixes files
```
npm run lint
```

The application will typically be accessible at http://localhost:8080

## 🧑‍💻 Usage
`/` page always redirects to the `/facts`

### Simple Authentication

Upon loading the application for the first time, you will be prompted to enter a Username.
The application will use this username to create or retrieve a temporary user session. Your session persists as long as you do not explicitly sign out or clear your browser data.
Pages `/facts` and `/fact` available only after singing.
You can sign out by clicking on the account icon.

### Theme Switching

The application offers two visual themes: light and dark
Look for the theme toggle icon in the header.
Persistence: Clicking the button instantly switches the interface. Your selection is automatically saved and will be loaded the next time you visit the application.
