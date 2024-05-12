import React from 'react';
import { Modal, Form, Alert } from 'react-bootstrap';

const DeliveryOptionForm = ({
    show,
    onHide,
    formType,
    currentOption,
    setCurrentOption,
    stores,
    formErrors,
    handleAction,
}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{formType === 'create' ? 'Добавить опцию доставки' : 'Изменить опцию доставки'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="deliveryTime" className="mt-2">
                        <Form.Label>Время доставки</Form.Label>
                        <Form.Control
                            type="number"
                            value={currentOption.deliveryTime || ''}
                            onChange={e => setCurrentOption({ ...currentOption, deliveryTime: e.target.value })}
                        />
                        {formErrors.deliveryTime && <Alert variant="danger" className="mt-1">{formErrors.deliveryTime}</Alert>}
                    </Form.Group>

                    <Form.Group controlId="deliveryPrice" className="mt-2">
                        <Form.Label>Стоимость доставки</Form.Label>
                        <Form.Control
                            type="number"
                            value={currentOption.deliveryPrice || ''}
                            onChange={e => setCurrentOption({ ...currentOption, deliveryPrice: e.target.value })}
                        />
                        {formErrors.deliveryPrice && <Alert variant="danger" className="mt-1">{formErrors.deliveryPrice}</Alert>}
                    </Form.Group>

                    <Form.Group controlId="storeId" className="mt-4">
                        <Form.Label>Магазин</Form.Label>
                        <Form.Control as="select"
                            value={currentOption.storeId || ''}
                            onChange={e => setCurrentOption({ ...currentOption, storeId: e.target.value })}
                        >
                            <option value="">Выберите магазин</option>
                            {stores.map(store => (
                                <option key={store.storeId} value={store.storeId}>
                                    {store.city} - {store.address}
                                </option>
                            ))}
                        </Form.Control>
                        {formErrors.storeId && <Alert variant="danger" className="mt-1">{formErrors.storeId}</Alert>}
                    </Form.Group>

                    <Form.Group controlId="deliveryType" className="mt-4">
                        <Form.Label>Тип доставки</Form.Label>
                        <Form.Control as="select"
                            value={currentOption.deliveryType || ''}
                            onChange={e => setCurrentOption({ ...currentOption, deliveryType: e.target.value })}
                        >
                            <option value="">Выберите тип доставки</option>
                            <option value="Курьер">Курьер</option>
                            <option value="Самовывоз">Самовывоз</option>
                        </Form.Control>
                        {formErrors.deliveryType && <Alert variant="danger" className="mt-1">{formErrors.deliveryType}</Alert>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={onHide} className="btn btn-outline-secondary">Отмена</button>
                <button onClick={handleAction} className={formType === 'create' ? 'btn btn-outline-success' : 'btn btn-outline-warning'}>
                    {formType === 'create' ? 'Добавить' : 'Изменить'}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeliveryOptionForm;