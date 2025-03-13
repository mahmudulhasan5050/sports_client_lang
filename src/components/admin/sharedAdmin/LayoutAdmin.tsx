import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Breadcrumb from './Breadcrumb';

const LayoutAdmin = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:h-screen bg-neutral-100 overflow-hidden">
            <SideBar />
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Breadcrumb */}
                <div className="p-4">
                    <Breadcrumb />
                </div>
                {/* Main Content */}
                <div className="p-4 flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default LayoutAdmin;

