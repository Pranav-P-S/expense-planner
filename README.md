Personal Expense & Budget PlannerA full-stack web application designed to help users track daily expenses, manage monthly budgets, and gain insights into their spending habits through interactive data visualizations.Live Demo 👈 (Replace your-project-id.web.app with your actual Firebase Hosting URL)✨ FeaturesSecure User Authentication: Users can sign up and log in using email and password, with all user data stored securely.Full CRUD Operations for Expenses: Users can Create, Read, Update, and Delete their daily expense records.Dynamic Dashboard: An interactive dashboard that provides an at-a-glance overview of financial health.Visual Analytics:Pie Chart: Visualizes spending distribution by category for the current month.Line Chart: Shows daily spending trends to identify patterns over time.Budget Planning: Users can set monthly budgets for different spending categories.Visual Budget Alerts: Progress bars provide real-time feedback on spending against budgets, changing color at 80% (warning) and 100% (exceeded).Real-Time Database: Built with Firebase Firestore, all changes are reflected instantly across the application without needing a page refresh.🛠️ Tech StackFrontend: React.js (with Vite)State Management: React Context APIRouting: React RouterBackend-as-a-Service (BaaS): FirebaseDatabase: Cloud Firestore (NoSQL Document Database)Authentication: Firebase AuthenticationHosting: Firebase HostingCharting Library: Recharts🚀 Getting StartedFollow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.PrerequisitesNode.js (v18 or newer)npm (Node Package Manager)A free Firebase accountInstallation & SetupClone the repository:git clone https://github.com/YourUsername/expense-planner.git
cd expense-planner/client

Install NPM packages:npm install

Set up Firebase:Create a new project in the Firebase Console.Enable Authentication (Email/Password method) and Firestore Database (start in test mode).Register a new web app and copy your Firebase configuration keys.Create an environment file:In the client directory, create a file named .env.local.Add your Firebase config keys to this file. Remember to prefix them with VITE_.VITE_API_KEY="AIzaSy...xxxxxxxx"
VITE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_PROJECT_ID="your-project-id"
VITE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_MESSAGING_SENDER_ID="1234567890"
VITE_APP_ID="1:1234567890:web:xxxxxxxxxxxx"

Run the application:npm run dev

The application will be available at http://localhost:5173.📸 Screenshots(Add screenshots of your application here. For example:)Login PageDashboard🔮 Future EnhancementsRecurring Expenses: Ability to set up automatic monthly expenses like rent or subscriptions.Advanced Filtering: Filter expenses by category or a custom date range.Data Export: Export financial data to a CSV file.Mobile-First Design: Improve CSS for a better experience on mobile devices.
