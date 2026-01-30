import { useState, useEffect } from 'react'
import Arrow_Button from "../../assets/Arrow.svg"

function SubMenu({ category, refreshProject }){
    const [isOpen, setIsOpen] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    
    useEffect(() => {
        if(category == "Projects" || category == "Tasks"){
            fetch(`https://localhost:5201/api/ToDo/${category}`, {
                method: "GET",
                credentials: "include"
            })
            .then((response) => response.json())
            .then((json) => {
                setCategoryData(json.data);
            });
        }
    }, [refreshProject]);
    
    const arrowClick = (e) => {
        if(isOpen){
            e.target.classList.remove("Rotate-Arrow");
            e.target.parentNode.nextElementSibling.style.display = "none";
            setIsOpen(false);
        } else {

            e.target.classList.add("Rotate-Arrow");
            e.target.parentNode.nextElementSibling.style.display = "block";
            setIsOpen(true);
        }
    }
    
    return(
        <>
            <div className="Project">
                <div className="Project-Header">
                    <b className="Project-Name">{category}</b>
                    <img src={Arrow_Button} className="Arrow-Button" onClick={arrowClick}></img>
                </div>
                <ul className="Sub-Project-List" id={category}>
                    {categoryData.map((data) => (
                        <li key={data} className="Sub-Project-Name">{data}</li>
                    ))}
                    <li className="Sub-Project-Name">Test</li>
                </ul>
            </div>
        </>
    )
}

export default SubMenu;