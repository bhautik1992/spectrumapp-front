import { Link, useNavigate } from "react-router-dom";
import Avatar from "@components/avatar";
import { User,Settings,Power } from "react-feather";
import { UncontrolledDropdown,DropdownMenu,DropdownToggle,DropdownItem } from "reactstrap";
import defaultAvatar from "@src/assets/images/portrait/small/default.jpg";
import { useDispatch } from 'react-redux';
import { logout } from  '../../../../services/actions/LoginAction';

const UserDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged Out Successfully.');
        navigate("/login");
    }

    return (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle
                href="/"
                tag="a"
                className="nav-link dropdown-user-link"
                onClick={(e) => e.preventDefault()}
            >
                <div className="user-nav d-sm-flex d-none">
                    <span className="user-name fw-bold">John Doe</span>
                    <span className="user-status">Admin</span>
                </div>
                <Avatar
                    img={defaultAvatar}
                    imgHeight="40"
                    imgWidth="40"
                    status="online"
                />
            </DropdownToggle>
            
            <DropdownMenu end>
                <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                    <User size={14} className="me-75" />
                    <span className="align-middle">Profile</span>
                </DropdownItem>

                <DropdownItem
                    tag={Link}
                    to="/settings"
                    onClick={(e) => e.preventDefault()}
                >
                    <Settings size={14} className="me-75" />
                    <span className="align-middle">Settings</span>
                </DropdownItem>
                
                <DropdownItem tag={Link} to='#' onClick={handleLogout}>
                    <Power size={14} className="me-75" />
                    <span className="align-middle">Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default UserDropdown;


