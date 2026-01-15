import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual login logic
        if (email && password) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Branding Section */}
            <div className="hidden lg:flex w-1/2 bg-brand-blue items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-blue/90 z-10" />
                <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')" }}></div>

                <div className="relative z-20 text-center px-12">
                    <img src="/logo.png" alt="Shubham EPC" className="h-20 mx-auto mb-8 bg-brand-white p-4 rounded-xl shadow-xl" />
                    <h1 className="text-4xl font-bold text-brand-white mb-4">Shubham EPC Pvt. Ltd.</h1>
                    <p className="text-brand-lightblue text-lg">Building Future</p>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
                <div className="bg-brand-white p-8 rounded-xl shadow-lg w-full max-w-md mx-4 transition-colors duration-200">
                    <div className="text-center mb-10">
                        <img src="/logo.png" alt="Shubham APP" className="h-12 mx-auto lg:hidden mb-6" />
                        <h2 className="text-3xl font-bold text-brand-blue">Welcome Back</h2>
                        <p className="text-brand-gray mt-2">Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-gray mb-2">Email Address</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-brand-lightblue/30 rounded-lg focus:ring-2 focus:ring-brand-blue bg-brand-white text-brand-blue transition-all outline-none"
                                placeholder="rajnish.kumar@shubham.biz"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-gray mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-brand-lightblue/30 rounded-lg focus:ring-2 focus:ring-brand-blue bg-brand-white text-brand-blue transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="w-full btn-primary py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-brand-blue/30 transition-shadow">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
