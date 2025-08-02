// src/components/ExpenseForm.jsx
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food'); // Default category
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date) {
      return alert('Please fill out amount and date.');
    }

    try {
      await addDoc(collection(db, 'expenses'), {
        userId: currentUser.uid,
        amount: parseFloat(amount),
        category,
        date,
        notes,
        createdAt: serverTimestamp(),
      });
      // Clear the form
      setAmount('');
      setCategory('Food');
      setDate('');
      setNotes('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to add expense.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Expense</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional notes"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;