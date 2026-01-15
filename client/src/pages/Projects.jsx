import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        fetch(`${apiUrl}/api/projects`)
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));
    }, []);

    const filteredProjects = projects.filter(p =>
        (statusFilter === 'All' || p.status === statusFilter) &&
        p.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-brand-blue">Projects</h2>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="pl-10 pr-4 py-2 border border-brand-lightblue/30 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none text-brand-blue"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        <select
                            className="pl-10 pr-4 py-2 border border-brand-lightblue/30 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none appearance-none bg-white text-brand-blue"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Planning">Planning</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-brand-lightblue/30">
                            <th className="pb-4 font-semibold text-brand-gray">Project Name</th>
                            <th className="pb-4 font-semibold text-brand-gray">Client</th>
                            <th className="pb-4 font-semibold text-brand-gray">Budget</th>
                            <th className="pb-4 font-semibold text-brand-gray">Status</th>
                            <th className="pb-4 font-semibold text-brand-gray">Start Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((project) => (
                            <tr key={project.id} className="border-b border-brand-lightblue/20 hover:bg-brand-lightblue/5 transition-colors">
                                <td className="py-4 font-medium text-brand-blue">{project.name}</td>
                                <td className="py-4 text-brand-gray">{project.client_name}</td>
                                <td className="py-4 text-brand-gray">₹ {Number(project.budget).toLocaleString()}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${project.status === 'In Progress' ? 'bg-brand-lightblue/30 text-brand-blue' :
                                            project.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-brand-gray'}`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="py-4 text-brand-gray">{project.start_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Projects;
