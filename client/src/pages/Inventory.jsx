import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';

const Inventory = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/inventory/stocks')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Package className="text-blue-600" />
                    Inventory Stock
                </h2>
            </div>

            <div className="card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Item Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Project Ref</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Quantity</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Unit Price</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Total Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 text-gray-500">{item.project_id}</td>
                                <td className="px-6 py-4 font-medium text-blue-600">{item.quantity} {item.unit}</td>
                                <td className="px-6 py-4 text-gray-600">₹ {item.unit_price}</td>
                                <td className="px-6 py-4 font-semibold text-gray-900">
                                    ₹ {(item.quantity * item.unit_price).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
