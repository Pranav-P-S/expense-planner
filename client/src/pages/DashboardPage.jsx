// src/pages/DashboardPage.jsx
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db, auth } from "../firebase";
import {
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import ExpenseForm from "../components/ExpenseForm"; // Import the form
import EditExpenseModal from "../components/EditExpenseModal"; // Import the modal
import ExpenseChart from "../components/ExpenseChart";
import ProgressBar from "../components/ProgressBar";
import TrendChart from "../components/TrendChart";

function DashboardPage() {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [budgets, setBudgets] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Replace your useEffect with this corrected version
  useEffect(() => {
    if (!currentUser) return;

    // Real-time listener for expenses
    const expensesQuery = query(
      collection(db, "expenses"),
      where("userId", "==", currentUser.uid),
      orderBy("date", "desc")
    );
    const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expensesData);
      setIsLoading(false);
    });

    // Real-time listener for budgets
    const budgetDocRef = doc(db, "budgets", currentUser.uid);
    const unsubscribeBudgets = onSnapshot(budgetDocRef, (doc) => {
      if (doc.exists()) {
        setBudgets(doc.data());
      }
    });

    // Cleanup both listeners on component unmount
    return () => {
      unsubscribeExpenses();
      unsubscribeBudgets();
    };
  }, [currentUser]);

  // Inside DashboardPage.jsx, after your useState hooks

  const monthlyData = useMemo(() => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Filter expenses for the current month
    const currentMonthExpenses = expenses.filter((expense) => {
      // The date from the form is a string 'YYYY-MM-DD', convert it to a Date object
      const expenseDate = new Date(expense.date);
      return expenseDate >= firstDayOfMonth;
    });

    // Calculate total spend for the month
    const totalSpend = currentMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    // Group expenses by category
    const categorySpend = currentMonthExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // Format data for the pie chart
    const chartData = Object.entries(categorySpend).map(([name, value]) => ({
      name,
      value,
    }));

    const trendData = expenses.reduce((acc, expense) => {
      // We use the date string 'YYYY-MM-DD' as the key
      const date = expense.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += expense.amount;
      return acc;
    }, {});

    const formattedTrendData = Object.keys(trendData)
      .sort((a, b) => new Date(a) - new Date(b)) // Sort dates chronologically
      .map((date) => ({
        date: new Date(date).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        }),
        total: trendData[date],
      }));

    return { totalSpend, chartData, trendData: formattedTrendData };
  }, [expenses]); // This dependency array ensures calculations re-run only when expenses change

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteDoc(doc(db, "expenses", id));
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Failed to delete expense.");
      }
    }
  };

  const handleOpenEditModal = (expense) => {
    setCurrentExpense(expense);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </button>
      <p>Welcome, {currentUser.email}!</p>
      <Link to="/budgets">Manage Budgets</Link>
      <div className="analytics-summary">
        <h2>This Month's Spend: ₹{monthlyData.totalSpend.toFixed(2)}</h2>
        <ExpenseChart data={monthlyData.chartData} />

        <h3 style={{ marginTop: "20px" }}>Spending Trend</h3>
        <TrendChart data={monthlyData.trendData} />

        <h3 style={{ marginTop: "20px" }}>Budget Status</h3>
        {Object.keys(budgets).map((category) => {
          const spent =
            monthlyData.chartData.find((d) => d.name === category)?.value || 0;
          const limit = budgets[category];
          return (
            <div key={category} style={{ marginBottom: "10px" }}>
              <strong>{category}:</strong> ₹{spent.toFixed(2)} / ₹
              {(limit || 0).toFixed(2)}
              <ProgressBar value={spent} max={limit} />
            </div>
          );
        })}
      </div>
      <hr />
      <ExpenseForm />
      <hr />
      <h2>Your Expenses</h2>
      <div className="expense-list">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <p>
              <strong>Category:</strong> {expense.category}
            </p>
            <p>
              <strong>Amount:</strong> ₹{expense.amount.toFixed(2)}
            </p>
            <p>
              <strong>Date:</strong> {expense.date}
            </p>
            <p>
              <strong>Notes:</strong> {expense.notes}
            </p>
            <button onClick={() => handleOpenEditModal(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </div>
        ))}
      </div>
      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        expense={currentExpense}
      />
    </div>
  );
}

export default DashboardPage;
