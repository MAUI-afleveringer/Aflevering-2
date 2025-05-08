import ExpenseModal from "./Modals/AddExpenseToJobModal";
import { createPortal } from 'react-dom';
import { useState } from "react"

export default function Expenses() {
    const [expense, setExpence] = useState([]);
    const [showModal, setShowModal] = useState(false);

    function addExpense(newModel)  {
        setExpence(prevData => [...prevData, newModel])
    }; 
    return (
        <main>
        <h1>Expenses</h1>
        <button onClick={() => setShowModal(true)}>Create new model</button>
                    {showModal && createPortal(
                                    <ExpenseModal onClose={() => setShowModal(false)} addModel={addExpense} />, document.body
                                )}
        </main>
    )
}