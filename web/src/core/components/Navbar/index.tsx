import { useEffect, useState } from 'react';

import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAccessTokenDecoded, logout } from 'core/utils/auth';

import menu from '../../assets/images/menu.svg';
import './styles.scss';

function Navbar() {
    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();

    const [drawerActive, setDrawerActive] = useState(false);

    useEffect(() => {
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    }, [location]);

    function handleLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        logout();
    }

    return (
        <nav className="bg-primary main-nav">
            <Link to="/" className="nav-logo-text">
                <h4>DS Catalog</h4>
            </Link>
            <button
                className="menu-mobile-btn"
                type="button"
                onClick={() => setDrawerActive(!drawerActive)}
            >
                <img src={menu} alt="Mobile Menu" />
            </button>

            <div className={drawerActive ? "menu-mobile-container" : "menu-container"}>
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" exact activeClassName="active" onClick={() => setDrawerActive(false)} >
                            HOME
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/products" activeClassName="active" onClick={() => setDrawerActive(false)} >
                            CATÁLOGO
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin" activeClassName="active" onClick={() => setDrawerActive(false)} >
                            ADMIN
                        </NavLink>
                    </li>
                    {
                        drawerActive && (
                            <li>
                                {
                                    currentUser && (
                                        <a href="#logout" 
                                            className="nav-link active d-inline" 
                                            onClick={(e) => {
                                                handleLogout(e);
                                                setDrawerActive(false);
                                            }}
                                        >
                                            {`LOGOUT - ${currentUser}`}
                                        </a>
                                    )
                                }
                            </li>
                        )
                    }
                    {
                        drawerActive && (
                            <>
                                {
                                    !currentUser && (
                                        <li>
                                            <Link to={"/auth/login"} className="nav-link active" onClick={() => setDrawerActive(false)} >
                                                LOGIN
                                            </Link>
                                        </li>
                                    )
                                }
                            </>
                        )
                    }
                </ul>
            </div>
            <div className="user-info-dnone text-end">
                {
                    currentUser && (
                        <>
                            {currentUser}
                            <a
                                href="#logout"
                                className="nav-link active d-inline"
                                onClick={(e) => {
                                    handleLogout(e);
                                    setDrawerActive(false);
                                }}
                            >
                                LOGOUT
                            </a>
                        </>
                    )
                }
                {!currentUser && (
                    <Link to={"/auth/login"} className="nav-link active" onClick={() => setDrawerActive(false)} >
                        LOGIN
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar;