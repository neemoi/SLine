import React from 'react';
import BasketItemComponent from './BasketItemComponent';
import '../styles/BasketItem.css';

function BasketStoreSection({ storeId, groupedItems, onRemoveProduct, onUpdateQuantity, isRemoving, openModal }) {
    return (
        <div className="store-section animate__animated animate__fadeInUp">
            <div className="store-header">
                <h1 className="store-name">
                    {groupedItems[storeId].storeName}
                    <span className="store-address">
                        {groupedItems[storeId].city ? ` ${groupedItems[storeId].city},` : ''}{groupedItems[storeId].address}
                    </span>
                </h1>
                <button className="order-button" onClick={() => openModal(storeId)}>
                    Заказать
                </button>
            </div>
            <hr className="section-divider" />

            {groupedItems[storeId].items.map((item, index) => (
                <React.Fragment key={item.itemId}>
                    <BasketItemComponent
                        item={item}
                        storeId={storeId}
                        onRemoveProduct={onRemoveProduct}
                        onUpdateQuantity={onUpdateQuantity}
                        isRemoving={isRemoving(item.productId)}
                    />
                    {index < groupedItems[storeId].items.length - 1 && (
                        <hr className="section-divider" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

export default BasketStoreSection;