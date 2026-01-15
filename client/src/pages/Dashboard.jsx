import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState([
        { title: 'Total Revenue', value: '₹ 0', change: '--', icon: DollarSign, color: 'bg-green-100 text-green-600' },
        { title: 'Active Projects', value: '0', change: '--', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
        { title: 'Receivables', value: '₹ 0', change: '--', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-600' },
        { title: 'Total Expenses', value: '₹ 0', change: '--', icon: CheckCircle, color: 'bg-purple-100 text-purple-600' },
    ]);

    const [loading, setLoading] = useState(true);
    const [budgetData, setBudgetData] = useState([]);

    useEffect(() => {
        const fetchKPIs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/kpis/summary');
                const data = await response.json();

                setStats([
                    { title: 'Total Revenue', value: `₹ ${(data.totalRevenue / 10000000).toFixed(2)} Cr`, change: '+12%', icon: DollarSign, color: 'bg-green-100 text-green-600' },
                    { title: 'Active Projects', value: data.activeProjects, change: '+2', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
                    { title: 'Receivables', value: `₹ ${(data.outstandingReceivables / 100000).toFixed(2)} L`, change: '-5%', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-600' },
                    { title: 'Total Expenses', value: `₹ ${(data.totalExpenses / 10000000).toFixed(2)} Cr`, change: '+8%', icon: CheckCircle, color: 'bg-purple-100 text-purple-600' },
                ]);

                // Fetch Variance Data
                const varianceRes = await fetch('http://localhost:5000/api/kpis/budget-variance');
                const variance = await varianceRes.json();
                setBudgetData(variance);

            } catch (error) {
                console.error("Failed to fetch KPIs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchKPIs();
    }, []);

    const data = [
        { name: 'Jan', revenue: 4000, expenses: 2400 },
        { name: 'Feb', revenue: 3000, expenses: 1398 },
        { name: 'Mar', revenue: 2000, expenses: 9800 },
        { name: 'Apr', revenue: 2780, expenses: 3908 },
        { name: 'May', revenue: 1890, expenses: 4800 },
        { name: 'Jun', revenue: 2390, expenses: 3800 },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="card flex items-center p-6">
                            <div className={`p-4 rounded-full ${stat.color} mr-4`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-brand-gray font-medium">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-brand-blue mt-1">{stat.value}</h3>
                                <span className={`text-xs font-bold ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>{stat.change} from last month</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card h-96">
                    <h3 className="text-lg font-bold text-brand-blue mb-6">Financial Overview</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#1e293b' }}
                                itemStyle={{ color: '#64748b' }}
                            />
                            <Bar dataKey="revenue" fill="#2f5195" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card h-96 overflow-auto">
                    <h3 className="text-lg font-bold text-brand-blue mb-6">Budget Variance (Risky Projects)</h3>
                    <table className="w-full text-left">
                        <thead className="bg-brand-lightblue/10">
                            <tr>
                                <th className="px-4 py-2 text-sm text-brand-gray font-semibold">Project</th>
                                <th className="px-4 py-2 text-sm text-brand-gray font-semibold">Spent</th>
                                <th className="px-4 py-2 text-sm text-brand-gray font-semibold">Usage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budgetData.map(p => (
                                <tr key={p.id} className="border-b border-brand-lightblue/20 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-sm font-medium text-brand-blue">{p.name}</td>
                                    <td className="px-4 py-3 text-sm text-brand-gray">₹ {(p.actual / 100000).toFixed(1)} L</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${p.utilization > 90 ? 'bg-red-500' : p.utilization > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                    style={{ width: `${Math.min(p.utilization, 100)}%` }}
                                                />
                                            </div>
                                            <span className={`text-xs font-bold ${p.utilization > 90 ? 'text-red-600' :
                                                    p.utilization > 70 ? 'text-yellow-600' :
                                                        'text-green-600'
                                                }`}>{p.utilization}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
