import { useState, useEffect } from 'react'
import './Projects.css'
import Search from "../../assets/Search.svg"
import Calendar from "../../assets/Calendar.svg"
import Has_Bell from "../../assets/Has-Notification-Bell.svg"
import No_Bell from "../../assets/No-Notification-Bell.svg"
import Profile_Picture from "../../assets/Profile-Picture.svg"

function Projects() {
    const [ToDoData, SetToDoData] = useState([])
    const [InProgressData, SetInProgressData] = useState([])
    const [DoneData, SetDoneData] = useState([])

    const clickView = (e) => {

        const target = e.target;
        const Views = document.querySelectorAll(".Views-Text");

        Views.forEach(View => {
            View.classList.remove("Views-Text-Selected");
        });

        target.classList.add("Views-Text-Selected");
    };

    useEffect(() => {
        fetch("https://localhost:5201/api/ToDo/GetToDo", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.success == true){
                SetToDoData(json.data)
            }
        });

        fetch("https://localhost:5201/api/ToDo/GetInProgress", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.success == true){
                SetInProgressData(json.data)
            }
        });

        fetch("https://localhost:5201/api/ToDo/GetDone", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.success == true){
                SetDoneData(json.data)
            }
        });

    }, [])

    const testButton = () => {
        console.log(InProgressData)
    }

    return(
        <div className='Projects'>
            <div className='Projects-In'>
                <div className='User-Info'>
                    <b className="Welcome">Welcome back, JAMES "RYAN" DUONG</b>
                    <img src={Profile_Picture} className="User-Icon-Image"></img>
                    <p className="Date">December 23 2025</p>
                    <img src={Calendar} className="User-Icons"></img>
                    <img src={Has_Bell} className="User-Icons"></img>
                    <img src={Search} className="User-Icons"></img>
                </div>
                <div className="Views">
                    <p onClick={clickView} className="Views-Text Views-Text-Selected"> View 1 </p>
                    <p onClick={clickView} className="Views-Text">View 2</p>
                </div>
                <div className='Tasks'>
                    <div className='Task-Category'>
                        <div className='Task-Category-Header'>
                            <p className='Task-Category-Text Task-Category-To-Do'>To Do</p>
                            <p className='Task-Add-Button-Text'>Add New Task</p>
                            <button className='Task-Add-Button'>
                                <svg width="18" height="18">
                                    <rect x="3.5" y="7" width="9" height="2" rx="1" fill="white" opacity="0.5"/>
                                    <rect x="7" y="3.5" width="2" height="9" rx="1" fill="white" opacity="0.5"/>
                                </svg>
                            </button>
                        </div>
                        {ToDoData.map((data) => (
                            <li className='Task'>
                            Task: {data.Task} <br /> <br />
                            Project: {data.Project} <br /> <br />
                            Description: {data.Description}
                            </li>
                        ))}
                    </div>
                    <div className='Task-Category Task-Category-Middle'>
                        <div className='Task-Category-Header'>
                            <p className='Task-Category-Text Task-Category-In-Progress'>In Progress</p>
                            <p className='Task-Add-Button-Text'>Add New Task</p>
                            <button className='Task-Add-Button'>
                                <svg width="18" height="18">
                                    <rect x="3.5" y="7" width="9" height="2" rx="1" fill="white" opacity="0.5"/>
                                    <rect x="7" y="3.5" width="2" height="9" rx="1" fill="white" opacity="0.5"/>
                                </svg>
                            </button>
                        </div>
                        {InProgressData.map((data) => (
                            <li className='Task'>
                            Task: {data.Task} <br /> <br />
                            Project: {data.Project} <br /> <br />
                            Description: {data.Description}
                            </li>
                        ))}
                    </div>
                    <div className='Task-Category'>
                        <div className='Task-Category-Header'>
                            <p className='Task-Category-Text Task-Category-Done'>Done</p>
                            <p className='Task-Add-Button-Text'>Add New Task</p>
                            <button className='Task-Add-Button'>
                                <svg width="18" height="18">
                                    <rect x="3.5" y="7" width="9" height="2" rx="1" fill="white" opacity="0.5"/>
                                    <rect x="7" y="3.5" width="2" height="9" rx="1" fill="white" opacity="0.5"/>
                                </svg>
                            </button>
                        </div>
                        {DoneData.map((data) => (
                            <li className='Task'>
                            Task: {data.Task} <br /> <br />
                            Project: {data.Project} <br /> <br />
                            Description: {data.Description}
                            </li>
                        ))}
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Projects