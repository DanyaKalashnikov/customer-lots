import React, { useState, useEffect } from 'react';
import { Modal } from '@consta/uikit/Modal';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Select } from '@consta/uikit/Select';
import { UserSelect } from '@consta/uikit/UserSelect';
import { DatePicker, DatePickerProps } from '@consta/uikit/DatePicker';
import LotService from '../../services/LotService';
import CustomerService from '../../services/CustomerService';
import { format, parseISO } from 'date-fns';

const LotForm = ({ onClose, onAddLot, updateId }) => {
    const [lot, setLot] = useState({
        lotName: '',
        lotDescription: '',
        price: '',
        currencyCode: 'RUB',
        ndsRate: 'Без НДС',
        customerCode: '',
        customer: '',
        placeDelivery: '',
        dateDelivery: '',
    });

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        CustomerService.getAll().then((response) => {
            const customerItems = response.data.map((customer) => ({
                label: customer.customerName,
                subLabel: customer.customerEmail,
                id: customer.customerCode,
            }));
            setCustomers(customerItems);

            if (updateId) {
                handleGet(customerItems);
            }
        });
    }, [updateId]);

    const [controlledDate, setControlledDate] = useState(null);

    const onChange: DatePickerProps['onChange'] = (date) => {
        setControlledDate(date);
    };

    const handleChangeSelect = ({ value }, name) => {
        setLot((prevLot) => ({
            ...prevLot,
            [name]: value,
        }));
    };

    const handleCustomerChange = (selectedItem) => {
        setSelectedCustomer(selectedItem);
        setLot((prevLot) => ({
            ...prevLot,
            ['customerCode']: selectedItem.id,
        }));
    };

    const handleChange = (value, params) => {
        setLot((prevLot) => ({
            ...prevLot,
            [params.name]: value,
        }));
    };

    const handleSave = () => {
        const lotToSend = {
            ...lot,
            dateDelivery: format(controlledDate, 'yyyy-MM-dd'),
        };

        const saveOrUpdate = updateId
            ? LotService.update(updateId, lotToSend)
            : LotService.create(lotToSend);

        saveOrUpdate
            .then((response) => {
                console.log(response);
                onAddLot(response.data);
                onClose();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleGet = (customerItems) => {
        LotService.get(updateId)
            .then((response) => {
                const lotData = response.data;
                setLot(lotData);
                const customer = customerItems.find(
                    (c) => c.id === lotData.customer.customerCode
                );
                handleCustomerChange(customer);

                if (lotData.dateDelivery) {
                    setControlledDate(parseISO(lotData.dateDelivery));
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const currencyOptions = [
        { label: 'RUB', value: 'RUB' },
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
    ];

    const ndsOptions = [
        { label: 'Без НДС', value: 'Без НДС' },
        { label: '18%', value: '18%' },
        { label: '20%', value: '20%' },
    ];

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
                        label="Название"
                        name="lotName"
                        value={lot.lotName}
                        onChange={handleChange}
                        type="text"
                        withClearButton
                        autoFocus
                    />
                    <TextField
                        label="Описание"
                        name="lotDescription"
                        value={lot.lotDescription}
                        onChange={handleChange}
                        type="textarea"
                        withClearButton
                    />
                    <TextField
                        label="Цена"
                        name="price"
                        value={lot.price}
                        onChange={handleChange}
                        type="number"
                        withClearButton
                    />
                    <Select
                        label="Валюта"
                        items={currencyOptions}
                        value={currencyOptions.find(
                            (option) => option.value === lot.currencyCode
                        )}
                        onChange={(event) =>
                            handleChangeSelect(event, 'currencyCode')
                        }
                        withClearButton
                    />
                    <Select
                        label="Ставка НДС"
                        items={ndsOptions}
                        value={ndsOptions.find(
                            (option) => option.value === lot.ndsRate
                        )}
                        onChange={(event) =>
                            handleChangeSelect(event, 'ndsRate')
                        }
                        withClearButton
                    />
                    <UserSelect
                        label="Клиент"
                        name="customerCode"
                        items={customers}
                        value={selectedCustomer}
                        onChange={handleCustomerChange}
                        withClearButton
                    />
                    <TextField
                        label="Место доставки"
                        name="placeDelivery"
                        value={lot.placeDelivery}
                        onChange={handleChange}
                        type="textarea"
                        rows={2}
                        withClearButton
                    />
                    <DatePicker
                        label="Дата доставки"
                        name="dateDelivery"
                        type="date"
                        format="yyyy-MM-dd"
                        separator="-"
                        value={controlledDate}
                        onChange={onChange}
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

export default LotForm;
