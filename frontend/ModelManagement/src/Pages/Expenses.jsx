import ExpenseModal from "../Modals/AddExpenseToJobModal";
import { createPortal } from 'react-dom';
import { useState } from "react"

export default function Expenses() {
    const [expense, setExpence] = useState([]);
    const [showModal, setShowModal] = useState(false);

    function addExpense(newExpense) {
        setExpence(prevData => [...prevData, newExpense])
    };
    return (
        <main className="mainPage">
            <li className="listStyle">
                
            <h1 className="headers">Expenses</h1>
            <br></br>
            <li className="listStyle">
            <button className="paddingBetweenButtons" onClick={() => setShowModal(true)}>Add expense to job</button>
            </li></li>
            {showModal && createPortal(
                <ExpenseModal onClose={() => setShowModal(false)} addExpense={addExpense} />, document.body
            )}
        </main>
    )
}