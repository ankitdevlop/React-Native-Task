# React Native Task

This is a React Native project that includes product management functionalities such as adding, updating, and viewing product details using Redux and AsyncStorage.

## 📌 Features
- List products on the home screen.
- View product details.
- Add a new product.
- Update an existing product.
- Store product data using **Redux** and **AsyncStorage**.
- API integration for fetching and updating product details.

## 📂 Project Structure
CLARUS_TASK/
│── android/                 # Android-specific files
│── ios/                     # iOS-specific files
│── src/                     # Source code
│   ├── pages/               # Screens and Components
│   │   ├── Loader/          # Loading component
│   │   │   ├── Loader.js
│   │   ├── Product/         # Product-related screens
│   │   │   ├── slice/       # Redux slice for product state management
│   │   │   │   ├── slice.js
│   │   │   ├── Home.jsx     # Home screen with product list
│   │   │   ├── ProductDetails.jsx  # Product details screen
│   │   │   ├── ProductForm.jsx     # Form for adding/updating product
│   ├── utilities/           # Utility functions and configurations
│   │   ├── api.js           # API handling
│   │   ├── apiUrls.js       # API endpoints
│   │   ├── combineReducer.js # Redux root reducer
│   │   ├── constants.js     # Constant values
│   │   ├── storage.js       # AsyncStorage utility
│   │   ├── store.js         # Redux store configuration
│── .eslint.rc.js            # ESLint configuration
│── .gitignore               # Files to ignore in Git
│── .prettierrc.js           # Prettier config
│── App.js                   # Main entry point for the app
│── app.json                 # App configuration
│── babel.config.js          # Babel configuration
│── Gemfile                  # Ruby dependencies (if applicable)


bash
Copy
Edit

## 🛠️ Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/ankitdevlop/React-Native-Task.git
   cd React-Native-Task
Install Dependencies

sh
Copy
Edit
npm install
or

sh
Copy
Edit
yarn install
Start the Metro Bundler

sh
Copy
Edit
npm start
Run on Android

sh
Copy
Edit
npx react-native run-android
Run on iOS (MacOS only)

sh
Copy
Edit
npx react-native run-ios
🚀 Technologies Used
React Native - Framework for building mobile apps.
Redux Toolkit - State management.
AsyncStorage - Local storage for persisting data.
React Hook Form - Form handling.
React Navigation - Navigation between screens.
📌 Future Enhancements
Implement backend API for real-time data persistence.
Add validation for form inputs.
Improve UI with animations and better styling.
📝 License
This project is open-source and available under the MIT License.