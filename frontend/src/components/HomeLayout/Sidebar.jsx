
import './Sidebar.css'
import Logo from '../../assets/Logo.png'
import Icon1 from '../../assets/Icon1.svg'
import Icon2 from '../../assets/Icon2.svg'
import Icon3 from '../../assets/Icon3.svg'
import Icon4 from '../../assets/Icon4.svg'
import Icon5 from '../../assets/Icon5.svg'
import Icon6 from '../../assets/Icon6.svg'
import Logout from '../../assets/Logout.svg'

function Sidebar() {
    return(
        <>
            <div className="Sidebar">
                <img src={Logo} className="My-Logo" alt="My logo" width="24" height="26"></img>

                <div className="Options">
                    <img src={Icon1} className="Icon" width="22" height="22" alt="Icon1"></img>
                    <img src={Icon2} className="Icon" width="22" height="22" alt="Icon2"></img>
                    <img src={Icon3} className="Icon" width="22" height="22" alt="Icon3"></img>
                    <img src={Icon4} className="Icon" width="22" height="22" alt="Icon4"></img>
                    <img src={Icon5} className="Icon" width="22" height="22" alt="Icon5"></img>
                    <img src={Icon6} className="Icon" width="22" height="22" alt="Icon6"></img>
                </div>

                <img src={Logout} className="Logout" width="22" height="22" alt="Logout-Logo"></img>
            </div>
        </>
    )
}

export default Sidebar