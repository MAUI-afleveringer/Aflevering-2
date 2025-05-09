import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react";
import React from "react";
import { createPortal } from "react-dom";
import AddModelToJobModal from "../Modals/AddModelToJobModal";
import DeleteModelFromJobModal from "../Modals/DeleteModelFromJob";

import JobModal from "../Modals/CreateJobModal";

export default function Jobs() {
    const [data, setData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
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

    // Function to add job 
    function addJob(newJob) {
        setData(prevData => [prevData, newJob])
    }

    function deleteModelFromJob(deleteModelFromJob) {
        setData(prevData => [prevData, deleteModelFromJob])
    }

    function addModel(newModelData) {
        setSelectedJob(prevSelectedJob => ({
            ...prevSelectedJob, // Spreading the previous states job

            // Overriding the model property with existing models + added model
            models: [...(Array.isArray(prevSelectedJob.models) ? prevSelectedJob.models : []), newModelData]
        }));
    }


    useEffect(() => {

        const run = async () => {
            console.log(decoded);
            await fetchJobs();
        }
        run();

    }, [])

    //button added for job and createPortal added
    return (
        <main className="mainPage">
            
            <button onClick={() => setShowCreateModal(true)}>Create new Job listing</button>
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
                showCreateModal && createPortal(
                    <JobModal onClose={() => setShowCreateModal(false)} addJob={addJob} />, document.body
                )
            }

            {
                showAddModal && createPortal(
                    <AddModelToJobModal onClose={() => setShowAddModal(false)} jobId={selectedJob.jobId} />
                    , document.body)
            }

            <button onClick={() => setShowDeleteModal(true)}>Delete model from job</button>
            {showDeleteModal && createPortal(
                <DeleteModelFromJobModal onClose={() => setShowDeleteModal(false)} deleteFromJob={deleteModelFromJob} />, document.body
            )}
        </main>


    )
}