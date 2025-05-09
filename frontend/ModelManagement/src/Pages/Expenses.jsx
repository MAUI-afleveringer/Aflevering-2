import ExpenseModal from "../Modals/AddExpenseToJobModal";
import { createPortal } from 'react-dom';
import { useState } from "react"

export default function Expenses() {
    const [expense, setExpence] = useState([]);
    const [showModal, setShowModal] = useState(false);

    function addExpense(newExpense)  {
        setExpence(prevData => [...prevData, newExpense])
    }; 
    return (
        <main>
        <h1>Expenses</h1>
        <button onClick={() => setShowModal(true)}>Add expense to job</button>
                    {showModal && createPortal(
                                    <ExpenseModal onClose={() => setShowModal(false)} addExpense={addExpense} />, document.body
                                )}
        </main>
    )
}