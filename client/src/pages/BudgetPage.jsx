// src/pages/BudgetPage.jsx
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const CATEGORIES = ["Food", "Travel", "Rent", "Entertainment", "Other"];

function BudgetPage() {
  const [budgets, setBudgets] = useState({});
  const userId = auth.currentUser.uid;

  // Fetch existing budgets when component loads
  useEffect(() => {
    const fetchBudgets = async () => {
      const docRef = doc(db, 'budgets', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBudgets(docSnap.data());
      }
    };
    fetchBudgets();
  }, [userId]);

  const handleSetBudget = (category, value) => {
    setBudgets(prev => ({ ...prev, [category]: parseFloat(value) || 0 }));
  };

  const handleSaveBudgets = async () => {
    try {
      const docRef = doc(db, 'budgets', userId);
      // Using setDoc with merge:true will create or update the document
      await setDoc(docRef, budgets, { merge: true });
      alert('Budgets saved successfully!');
    } catch (error) {
      console.error("Error saving budgets: ", error);
      alert('Failed to save budgets.');
    }
  };

  return (
    <div>
      <Link to="/dashboard">Back to Dashboard</Link>
      <h2>Set Your Monthly Budgets</h2>
      {CATEGORIES.map(category => (
        <div key={category}>
          <label>{category}: </label>
          <input
            type="number"
            value={budgets[category] || ''}
            onChange={(e) => handleSetBudget(category, e.target.value)}
            placeholder="0"
          />
        </div>
      ))}
      <button onClick={handleSaveBudgets}>Save Budgets</button>
    </div>
  );
}

export default BudgetPage;