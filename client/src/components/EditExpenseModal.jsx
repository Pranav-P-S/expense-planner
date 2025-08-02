// src/components/EditExpenseModal.jsx
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

function EditExpenseModal({ isOpen, onClose, expense }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  // When the expense prop changes, update the form state
  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setCategory(expense.category);
      setDate(expense.date);
      setNotes(expense.notes);
    }
  }, [expense]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const expenseRef = doc(db, 'expenses', expense.id);
      await updateDoc(expenseRef, {
        amount: parseFloat(amount),
        category,
        date,
        notes,
      });
      onClose(); // Close the modal on successful update
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Expense</h2>
        <form onSubmit={handleUpdate}>
          {/* Form fields are the same as ExpenseForm */}
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Travel">Travel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" />
          <button type="submit">Update Expense</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditExpenseModal;