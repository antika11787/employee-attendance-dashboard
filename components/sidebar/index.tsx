import { LuClipboardList } from "react-icons/lu";
import { BsFillPeopleFill, BsPeople } from "react-icons/bs";
import { LuFileX, LuFileStack } from "react-icons/lu";

import "./index.scss";

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-profile-info">
                <BsFillPeopleFill className="sidebar-heading-icon" />
                <h3 className="sidebar-heading-text">People</h3>
            </div>
            <div className="sidebar-menu">
                <div className="sidebar-menu-item">
                    <LuClipboardList className="sidebar-menu-item-icon" />
                    <p className="sidebar-menu-item-text">Dashboard</p>
                </div>
                <div className="sidebar-menu-item">
                    <BsPeople className="sidebar-menu-item-icon" />
                    <p className="sidebar-menu-item-text">Employee List</p>
                </div>
                <div className="sidebar-menu-item">
                    <LuFileX className="sidebar-menu-item-icon" />
                    <p className="sidebar-menu-item-text">Upload File</p>
                </div>
                <div className="sidebar-menu-item">
                    <LuFileStack className="sidebar-menu-item-icon" />
                    <p className="sidebar-menu-item-text">Previous Files</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
