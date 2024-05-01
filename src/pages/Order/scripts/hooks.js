import { useState, useEffect } from 'react';

export function useSortedOrders(orders, sortOrder) {
    const [sortedOrders, setSortedOrders] = useState([]);

    useEffect(() => {
        const sorted = [...orders].sort((a, b) => {
            const dateA = new Date(a.orderDate).getTime();
            const dateB = new Date(b.orderDate).getTime();

            if (sortOrder === 'desc') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });
        setSortedOrders(sorted);
    }, [orders, sortOrder]);

    return sortedOrders;
}