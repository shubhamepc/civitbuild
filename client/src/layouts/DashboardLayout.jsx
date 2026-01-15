import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, LogOut, DollarSign, Package, Users, Settings, Menu, X } from 'lucide-react';

const DashboardLayout = () => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDemoMode, setIsDemoMode] = useState(true);
    const [showApiModal, setShowApiModal] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: FolderKanban, label: 'Projects', path: '/projects' },
        { icon: DollarSign, label: 'Finance', path: '/finance' },
        { icon: Package, label: 'Inventory', path: '/inventory' },
        { icon: Users, label: 'HR', path: '/hr' },
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    const handleModeToggle = () => {
        if (isDemoMode) {
            // Switching to Live Mode -> Open Modal
            setShowApiModal(true);
        } else {
            // Switching back to Demo -> Just set state
            setIsDemoMode(true);
        }
    };

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-gray-100 flex justify-center">
                <img src="/logo.png" alt="CivilBuild ERP" className="h-[38px] w-auto object-contain" />
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-all duration-200 
                                ${isActive
                                    ? 'bg-brand-blue text-brand-white shadow-lg shadow-brand-blue/30 translate-x-1'
                                    : 'text-brand-gray hover:bg-brand-lightblue/10 hover:text-brand-blue hover:translate-x-1'
                                }`}
                        >
                            <Icon size={20} />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="relative">
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg hover:bg-brand-lightblue/10 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-brand-lightblue/40 flex items-center justify-center text-brand-blue font-bold text-xs ring-2 ring-brand-white">
                            RK
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-blue truncate">Rajnish Kumar</p>
                            <p className="text-xs text-brand-gray truncate">Super Admin</p>
                        </div>
                        <Settings size={16} className="text-brand-gray" />
                    </button>

                    {/* User Menu Popover */}
                    {userMenuOpen && (
                        <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-lg shadow-lg border border-gray-100 py-1 animate-in fade-in zoom-in-95 duration-200 z-50">
                            <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-brand-gray hover:bg-brand-lightblue/10">
                                <Settings size={16} />
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm text-red-600 hover:bg-red-50"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-gray-50 transition-colors duration-200 relative overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col transition-colors duration-200 flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 md:hidden flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent />
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 md:hidden"
                >
                    <X size={20} />
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto w-full relative">
                <header className="bg-brand-white border-b border-brand-lightblue/30 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-30 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 -ml-2 text-brand-gray hover:bg-brand-lightblue/10 rounded-lg md:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-semibold text-brand-blue truncate">Overview</h2>
                    </div>

                    {/* Demo/Live Mode Toggle */}
                    <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 flex-shrink-0">
                        <span className={`text-xs font-bold uppercase tracking-wider hidden sm:inline ${isDemoMode ? 'text-orange-500' : 'text-brand-green'}`}>
                            {isDemoMode ? 'Demo' : 'Live'}
                        </span>
                        <button
                            onClick={handleModeToggle}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-1 ${isDemoMode ? 'bg-orange-400' : 'bg-brand-green'}`}
                        >
                            <span
                                className={`${isDemoMode ? 'translate-x-1' : 'translate-x-5'} inline-block h-3 w-3 transform rounded-full bg-brand-white transition-transform shadow-sm`}
                            />
                        </button>
                    </div>
                </header>
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>

            {/* API Configuration Modal */}
            {showApiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-blue/20 backdrop-blur-sm p-4 transition-all">
                    <div className="bg-brand-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-brand-lightblue/30">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-brand-blue to-brand-blue/90 px-6 py-6 text-brand-white text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <DollarSign size={100} />
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                                <DollarSign size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold">Connect Live Data</h3>
                            <p className="text-brand-lightblue text-sm mt-1">Enter your credentials to access production</p>

                            <button
                                onClick={() => setShowApiModal(false)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-brand-gray uppercase tracking-wide mb-2">API Base URL</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-brand-lightblue rounded-xl focus:ring-2 focus:ring-brand-blue focus:bg-brand-white focus:border-brand-blue outline-none transition-all text-sm font-mono text-brand-blue"
                                        placeholder="https://api.civilbuild.com/v1"
                                        defaultValue="https://jsonplaceholder.typicode.com"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-brand-gray uppercase tracking-wide mb-2">Client ID</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-brand-lightblue rounded-xl focus:ring-2 focus:ring-brand-blue focus:bg-brand-white focus:border-brand-blue outline-none transition-all text-sm font-mono text-brand-blue"
                                            placeholder="demo-client-id"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-gray uppercase tracking-wide mb-2">Client Secret</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-gray-50 border border-brand-lightblue rounded-xl focus:ring-2 focus:ring-brand-blue focus:bg-brand-white focus:border-brand-blue outline-none transition-all text-sm font-mono text-brand-blue"
                                            placeholder="••••••••••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={() => setShowApiModal(false)}
                                    className="flex-1 px-4 py-3 text-sm font-semibold text-brand-gray bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setIsDemoMode(false);
                                        setShowApiModal(false);
                                    }}
                                    className="flex-1 px-4 py-3 text-sm font-semibold text-brand-white bg-brand-blue hover:opacity-90 shadow-lg hover:shadow-brand-blue/30 rounded-xl transition-all transform hover:-translate-y-0.5"
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
