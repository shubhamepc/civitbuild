import React, { useState, useEffect } from 'react';
import { Users, Phone, Mail } from 'lucide-react';

const HR = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/hr/employees')
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="text-blue-600" />
                Employee Directory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((emp) => (
                    <div key={emp.id} className="card hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{emp.name}</h3>
                                <p className="text-blue-600 text-sm font-medium">{emp.designation}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold
                            ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {emp.status}
                            </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-gray-400" />
                                {emp.email}
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" />
                                {emp.phone}
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                            <span className="text-gray-500">{emp.department}</span>
                            <span className="font-semibold text-gray-900">Joined: {emp.joining_date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HR;
