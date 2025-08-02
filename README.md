
# 💰 Personal Expense & Budget Planner

![Dashboard Screenshot](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

A full-stack web application designed to help users track daily expenses, manage monthly budgets, and gain insights into their spending habits through interactive data visualizations.

[![Live Demo](https://img.shields.io/badge/-Live%20Demo-brightgreen)](https://your-project-id.web.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🔒 **Secure User Authentication**: Email/password login with Firebase Authentication
- 📝 **Full CRUD Operations**: Create, Read, Update, and Delete expense records
- 📊 **Interactive Dashboard**: Financial overview at a glance
- 📈 **Visual Analytics**:
  - Pie charts for category spending distribution
  - Line charts for daily spending trends
- 💸 **Budget Planning**: Set monthly budgets by category
- 🚨 **Visual Budget Alerts**: Color-coded progress bars (warning at 80%, danger at 100%)
- ⚡ **Real-Time Updates**: Firebase Firestore syncs changes instantly

## 🛠️ Tech Stack

| Category          | Technology               |
|-------------------|--------------------------|
| Frontend          | React.js (Vite)          |
| State Management  | React Context API        |
| Routing           | React Router            |
| Backend           | Firebase                 |
| Database          | Cloud Firestore          |
| Authentication    | Firebase Authentication |
| Hosting           | Firebase Hosting         |
| Data Visualization| Recharts                 |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm (Node Package Manager)
- Firebase account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YourUsername/expense-planner.git
cd expense-planner/client
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
- Create a new project in the [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Email/Password method)
- Set up Firestore Database (start in test mode)
- Register a new web app and get your configuration keys

4. Create environment file:
```bash
# In client directory create .env.local with:
VITE_API_KEY="your-api-key"
VITE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_PROJECT_ID="your-project-id"
VITE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_MESSAGING_SENDER_ID="1234567890"
VITE_APP_ID="1:1234567890:web:xxxxxxxxxxxx"
```

5. Run the application:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.


## 🔮 Future Enhancements

- 🔄 Recurring Expenses (rent, subscriptions)
- 🔍 Advanced filtering by category/date range
- 📤 Data export to CSV
- 📱 Mobile-first design improvements
- 🌍 Multi-language support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ by [Your Name](https://github.com/Pranav-P-S)
