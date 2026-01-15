import React, { useState, useEffect } from 'react';
import { DollarSign, CreditCard } from 'lucide-react';

const Finance = () => {
    const [invoices, setInvoices] = useState([]);
    const [activeTab, setActiveTab] = useState('invoices');

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        fetch(`${apiUrl}/api/finance/${activeTab}`)
            .then(res => res.json())
            .then(data => setInvoices(data))
            .catch(err => console.error(err));
    }, [activeTab]);

    return (
        <div className="space-y-6">
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('invoices')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'invoices' ? 'bg-brand-blue text-brand-white' : 'bg-brand-white text-brand-gray hover:bg-brand-lightblue/10'}`}
                >
                    <DollarSign size={20} />
                    Invoices
                </button>
                <button
                    onClick={() => setActiveTab('payments')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'payments' ? 'bg-brand-blue text-brand-white' : 'bg-brand-white text-brand-gray hover:bg-brand-lightblue/10'}`}
                >
                    <CreditCard size={20} />
                    Payments
                </button>
            </div>

            <div className="card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-brand-lightblue/20 border-b border-brand-lightblue/30">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-brand-gray">Reference ID</th>
                            <th className="px-6 py-4 font-semibold text-brand-gray">Project</th>
                            <th className="px-6 py-4 font-semibold text-brand-gray">Date</th>
                            <th className="px-6 py-4 font-semibold text-brand-gray">Amount</th>
                            <th className="px-6 py-4 font-semibold text-brand-gray">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-lightblue/20">
                        {invoices.map((item) => (
                            <tr key={item.id} className="hover:bg-brand-lightblue/5">
                                <td className="px-6 py-4 font-medium text-brand-blue">{item.id}</td>
                                <td className="px-6 py-4 text-brand-gray">{item.project_id}</td>
                                <td className="px-6 py-4 text-brand-gray">{item.date}</td>
                                <td className="px-6 py-4 font-medium text-brand-blue">₹ {Number(item.amount).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${item.status === 'Paid' ? 'bg-green-100 text-green-600' :
                                            item.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Finance;
