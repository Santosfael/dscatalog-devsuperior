import { useEffect, useState } from 'react';

import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAccessTokenDecoded, logout } from 'core/utils/auth';

import './styles.scss';

function Navbar() {
    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();

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

            <div className="menu-container">
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" exact activeClassName="active">
                            HOME
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/products" activeClassName="active">
                            CATÁLOGO
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin" activeClassName="active">
                            ADMIN
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="text-end">
                {
                    currentUser && (
                        <>
                            {currentUser}
                            <a
                                href="#logout"
                                className="nav-link active d-inline"
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </a>
                        </>
                    )
                }
                {!currentUser && (
                    <Link to={"/auth/login"} className="nav-link active">
                        LOGIN
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar;