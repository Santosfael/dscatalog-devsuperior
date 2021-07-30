import AdminRoutes from './admin.routes';
import Navbar from './components/Navbar';
import './styles.scss';

function Admin() {
    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <AdminRoutes />
            </div>
        </div>
    )
}

export default Admin;