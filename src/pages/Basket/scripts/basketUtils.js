export async function updateQuantityWithCheck(user, userId, storeId, productId, quantity, setNotification, showNotification, fetchBasketItems) {
    try {
        const response = await fetch(`https://localhost:7036/Catalog/Warehouse/${storeId}/${productId}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            const stockQuantity = data.quantity;

            if (quantity > stockQuantity) {
                setNotification(`Невозможно добавить больше ${stockQuantity} единиц товара в корзину`);
                showNotification();
                return;
            }

            if (quantity < 1) {
                setNotification('Невозможно уменьшить количество товара до нуля');
                showNotification();
                return;
            }

            const requestBody = {
                userId,
                productId,
                storeId,
                quantity,
            };

            const updateResponse = await fetch(`https://localhost:7036/Basket/UpdateQuantity`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (updateResponse.ok) {
                fetchBasketItems(); 
            } else {
                console.error('Error updating quantity:', updateResponse.status);
                setNotification('Ошибка при обновлении количества товара');
                showNotification();
            }
        } else {
            console.error('Error fetching stock:', response.status);
            setNotification('Ошибка при получении данных о складе');
            showNotification();
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        setNotification('Произошла ошибка при обновлении количества товара');
        showNotification();
    }
}

export async function removeProduct(user, userId, groupedItems, storeId, productId, setNotification, showNotification, fetchBasketItems) {
    try {
        const item = groupedItems[storeId].items.find(i => i.productId === productId);
        const maxQuantity = item ? item.quantity : 0;

        const requestBody = {
            userId,
            productId,
            storeId,
            quantity: maxQuantity,
        };

        const response = await fetch(`https://localhost:7036/Basket/RemoveProduct`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            fetchBasketItems(); 
            setNotification('Товар удален из корзины');
            showNotification();
        } else {
            console.error('Error removing product:', response.status);
            setNotification('Ошибка при удалении товара из корзины');
            showNotification();
        }
    } catch (error) {
        console.error('Error removing product:', error);
        setNotification('Произошла ошибка при удалении товара из корзины');
        showNotification();
    }
}

export async function removeBasket(userId, user, setNotification, showNotification, fetchBasketItems) {
    const confirmRemove = window.confirm('Вы уверены, что хотите полностью очистить корзину?');
    if (!confirmRemove) {
        return;
    }

    try {
        const response = await fetch(`https://localhost:7036/Basket/RemoveBasket/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
        });

        if (response.ok) {
            fetchBasketItems(); 
            setNotification('Корзина очищена');
            showNotification();
        } else {
            console.error('Error removing basket:', response.status);
            setNotification('Ошибка при очистке корзины');
            showNotification();
        }
    } catch (error) {
        console.error('Error removing basket:', error);
        setNotification('Произошла ошибка при очистке корзины');
        showNotification();
    }
}

export function isRemoving(removingProductId, productId) {
    return removingProductId === productId;
}