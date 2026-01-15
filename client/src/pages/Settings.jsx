import React, { useState } from 'react';
import { Save, Server, Shield, Database } from 'lucide-react';

const Settings = () => {
    const [config, setConfig] = useState({
        dataSource: 'civitbuild', // Default to Live for demo effect
        apiUrl: 'https://jsonplaceholder.typicode.com', // Public Open API
        clientId: 'demo-client-id',
        clientSecret: 'demo-client-secret-123'
    });

    const [status, setStatus] = useState(null); // success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setTimeout(() => setStatus(null), 3000);
            } else {
                alert("Error: " + data.error);
                setStatus('error');
            }
        } catch (error) {
            console.error("Settings Error:", error);
            setStatus('error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-lightblue/30 rounded-lg text-brand-blue">
                    <Server size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-brand-blue">System Configuration</h2>
                    <p className="text-brand-gray">Manage API connections and data sources</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">

                {/* Data Source Selection */}
                <div className="card">
                    <h3 className="text-lg font-bold text-brand-blue mb-4 flex items-center gap-2">
                        <Database size={20} className="text-brand-gray" />
                        Data Source
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className={`cursor-pointer border-2 rounded-xl p-4 flex items-start gap-4 transition-all
                            ${config.dataSource === 'mock' ? 'border-brand-blue bg-brand-lightblue/20' : 'border-brand-lightblue/30 hover:border-brand-lightblue'}`}>
                            <input
                                type="radio"
                                name="dataSource"
                                value="mock"
                                checked={config.dataSource === 'mock'}
                                onChange={handleChange}
                                className="mt-1 accent-brand-blue"
                            />
                            <div>
                                <span className="block font-bold text-brand-blue">Demo / Mock Mode</span>
                                <span className="text-sm text-brand-gray">Use internal simulated data for testing and presentations.</span>
                            </div>
                        </label>

                        <label className={`cursor-pointer border-2 rounded-xl p-4 flex items-start gap-4 transition-all
                            ${config.dataSource === 'civitbuild' ? 'border-brand-blue bg-brand-lightblue/20' : 'border-brand-lightblue/30 hover:border-brand-lightblue'}`}>
                            <input
                                type="radio"
                                name="dataSource"
                                value="civitbuild"
                                checked={config.dataSource === 'civitbuild'}
                                onChange={handleChange}
                                className="mt-1 accent-brand-blue"
                            />
                            <div>
                                <span className="block font-bold text-brand-blue">Live Integration</span>
                                <span className="text-sm text-brand-gray">Connect to real CivilBuild ERP via REST API.</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* API Credentials */}
                <div className={`card transition-opacity duration-300 ${config.dataSource === 'mock' ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
                    <h3 className="text-lg font-bold text-brand-blue mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-brand-gray" />
                        API Credentials
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-brand-gray mb-1">API Base URL</label>
                            <input
                                type="text"
                                name="apiUrl"
                                value={config.apiUrl}
                                onChange={handleChange}
                                className="w-full p-2 border border-brand-lightblue/30 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none text-brand-blue"
                                placeholder="https://api.civitbuild.com/v1"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-gray mb-1">Client ID</label>
                                <input
                                    type="text"
                                    name="clientId"
                                    value={config.clientId}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-brand-lightblue/30 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none text-brand-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-gray mb-1">Client Secret</label>
                                <input
                                    type="password"
                                    name="clientSecret"
                                    value={config.clientSecret}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-brand-lightblue/30 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none text-brand-blue"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-end gap-4">
                    {status === 'success' && (
                        <span className="text-green-600 font-medium animate-fade-in">Settings saved successfully!</span>
                    )}
                    <button
                        type="submit"
                        className="btn-primary flex items-center gap-2 px-8 py-3"
                    >
                        <Save size={20} />
                        Save Configuration
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Settings;
