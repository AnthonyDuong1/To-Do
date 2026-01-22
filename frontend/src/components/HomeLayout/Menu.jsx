import { useState } from 'react'
import './Menu.css'
import SubMenu from "./SubMenu"

function Menu() {
    const [refreshProject, setRefreshProject] = useState(0);

    const addProject = () => {
        setRefreshProject(prevRefreshProject => prevRefreshProject + 1);
    };

    return(
        <div className="Menu">
            <div className="Menu-Header">
                <h2 className="Menu-Title">Projects</h2>
                <button className="Project-Add-Button" onClick={addProject}>
                    <svg width="20" height="20">
                        <rect x="5.5" y="11" width="9" height="2" rx="1" fill="white" />
                        <rect x="9" y="7.5" width="2" height="9" rx="1" fill="white" />
                    </svg>
                </button>
            </div>
            <div className="Projects-List">
                <SubMenu category="Teams"/>
                <SubMenu category="Projects" refreshProject={refreshProject}/>
                <SubMenu category="Tasks"/>
                <SubMenu category="Reminders"/>
                <SubMenu category="Messengers"/>
            </div>
        </div>
    )
}

export default Menu