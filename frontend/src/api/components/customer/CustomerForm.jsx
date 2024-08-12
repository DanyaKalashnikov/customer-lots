import React, { useEffect, useState } from 'react';
import { Modal } from '@consta/uikit/Modal';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Checkbox } from '@consta/uikit/Checkbox';
import CustomerService from '../../services/CustomerService';

const CustomerForm = ({ onClose, onAddCustomer, updateId }) => {
    const [customer, setCustomer] = useState({
        customerName: '',
        customerInn: '',
        customerKpp: '',
        customerLegalAddress: '',
        customerPostalAddress: '',
        customerEmail: '',
        organization: false,
        person: true,
    });

    useEffect(() => {
        if (updateId) {
            handleGet();
        }
    }, [updateId]);

    const handleCheckChange = (name) => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: !customer[name],
        }));
    };

    const handleChange = (value, params) => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [params.name]: value,
        }));
    };

    const handleSave = () => {
        console.log(customer);
        const saveOrUpdate = updateId
            ? CustomerService.update(updateId, customer)
            : CustomerService.create(customer);

        saveOrUpdate
            .then((response) => {
                console.log(response);
                onAddCustomer(response.data);
                onClose();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleGet = () => {
        CustomerService.get(updateId)
            .then((response) => {
                setCustomer(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <div>
            <Modal
                isOpen
                onClose={onClose}
                hasOverlay
                onClickOutside={onClose}
                onEsc={onClose}
            >
                <div className="text-container">
                    <TextField
                        label="ФИО"
                        name="customerName"
                        value={customer.customerName}
                        onChange={handleChange}
                        type="text"
                        withClearButton
                        autoFocus
                    />
                    <TextField
                        label="ИНН"
                        name="customerInn"
                        value={customer.customerInn}
                        onChange={handleChange}
                        type="number"
                        incrementButtons={false}
                        withClearButton
                    />
                    <TextField
                        label="КПП"
                        name="customerKpp"
                        value={customer.customerKpp}
                        onChange={handleChange}
                        type="number"
                        incrementButtons={false}
                        withClearButton
                    />
                    <TextField
                        label="Почтовый адрес"
                        name="customerPostalAddress"
                        value={customer.customerPostalAddress}
                        onChange={handleChange}
                        type="textarea"
                        rows={2}
                        withClearButton
                    />
                    <TextField
                        label="Юридическй адрес"
                        name="customerLegalAddress"
                        value={customer.customerLegalAddress}
                        onChange={handleChange}
                        type="textarea"
                        rows={2}
                        withClearButton
                    />
                    <TextField
                        label="Электронная почта"
                        name="customerEmail"
                        value={customer.customerEmail}
                        onChange={handleChange}
                        type="email"
                        withClearButton
                        placeholder="example@mail.ru"
                    />
                    <Checkbox
                        label="Юридическое лицо?"
                        name="organization"
                        value={customer.organization}
                        onChange={() => handleCheckChange('organization')}
                        checked={customer.organization}
                    />
                    <Checkbox
                        label="Физическое лицо?"
                        name="person"
                        value={customer.person}
                        onChange={() => handleCheckChange('person')}
                        checked={customer.person}
                    />
                </div>

                <div className="button-container">
                    <Button
                        className="button-red"
                        label="Закрыть"
                        onClick={onClose}
                    />
                    <Button
                        className="button-green"
                        label="Сохранить"
                        onClick={handleSave}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default CustomerForm;
