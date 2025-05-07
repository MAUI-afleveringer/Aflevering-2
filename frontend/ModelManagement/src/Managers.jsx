import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ManagerModal from './CreateManagerModal';

export default function Managers() {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/api/managers',
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: 'bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                }
            );
            const result = await response.json();
            setData(result);
            console.log('data is set');
        }
        fetchData();

    }, []); // Run the effect (fetch in this case) only once when the component renders

    return (
        <main>
            <button onClick={() => setShowModal(true)}>Create new manager</button>
            <h1>Managers</h1>
            {
                data ?
                    data.map(manager => (
                        <section className="manager">
                            <p className="managerId">{manager.managerId}</p>
                            <p className="managerName">{manager.firstName} {manager.lastName}</p>
                            <p className="managerEmail">{manager.email}</p>
                        </section>
                    ))
                    : <p>Loading...</p>
            }

            {showModal && createPortal(
                <ManagerModal onClose={() => setShowModal(false)} />, document.body
            )}
        </main>
    )
}