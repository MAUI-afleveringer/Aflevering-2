import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react";
import React from "react";
import { createPortal } from "react-dom";
import AddModelToJobModal from "./Modals/AddModelToJobModal";

export default function Jobs() {
    const [data, setData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];


    const fetchJobs = async () => {
        const url = "http://localhost:8080/api/Jobs";
        const response = await fetch(url,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const result = await response.json();
        setData(result);

    }

    function createNewJob(newJob) {
        setData(prevData => [prevData, newJob])
    }

    function addModel(model) {
        setSelectedJob(prevSelectedJob.models => [...selectedJob.models, model])
    }

    useEffect(() => {

        const run = async () => {
            console.log(decoded);
            await fetchJobs();
        }
        run();

    }, [])

    return (
        <main>

            <h1>Jobs</h1>
            {
                data ?
                    data.map(job => (
                        <React.Fragment key={job.jobId}>
                            <section className="job">
                                <p className="jobId">{job.jobId}</p>
                                <p className="jobCustomer">{job.constumer}</p>
                                <p className="jobStartDate">{job.startDate}</p>
                                <p className="jobId">{job.days}</p>
                                <p className="jobLocation">{job.location}</p>
                                <p className="jobComments">{job.comments}</p>

                                {role === "Manager" &&
                                    <section className="associatedModels">
                                        <button onClick={() => { setShowAddModal(true); setSelectedJob(job) }}>Add model to job</button>
                                        {job.models.map(model => (
                                            <section key={model.modelId}>
                                                <p>{model.firstName} {model.lastName}</p>
                                                <p>{model.email}</p>
                                            </section>
                                        ))}
                                    </section>
                                }
                            </section>
                        </React.Fragment>
                    ))
                    :
                    <p>Loading...</p>
            }

            {
                showAddModal && createPortal(
                    <AddModelToJobModal onClose={() => setShowAddModal(false)} jobId={selectedJob.jobId} />
                    , document.body)
            }
        </main>


    )
}