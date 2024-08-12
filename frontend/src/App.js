import { useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/Text';
import LotForm from './api/components/lot/LotForm';
import LotTable from './api/components/lot/LotTable';
import CustomerTable from './api/components/customer/CustomerTable';
import CustomerForm from './api/components/customer/CustomerForm';
import { IconAdd } from '@consta/icons/IconAdd';
import './App.css';

const App = () => {
    const [showCustomerTable, setShowCustomerTable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lots, setLots] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [updateId, setUpdateId] = useState(null);

    const toggleCustomerTable = () => {
        setShowCustomerTable(!showCustomerTable);
    };

    const handleAddLot = (newLot) => {
        setLots((prevLots) => {
            const updateLot = prevLots.find(
                (lot) => lot.lotId === newLot.lotId
            );

            if (updateLot) {
                const updatedLots = prevLots.map((lot) =>
                    lot.lotId === newLot.lotId ? newLot : lot
                );
                return updatedLots;
            } else {
                return [...prevLots, newLot];
            }
        });
    };

    const handleAddCustomer = (newCustomer) => {
        setCustomers((prevCustomers) => {
            const updateCustomer = prevCustomers.find(
                (customer) => customer.customerCode === newCustomer.customerCode
            );

            if (updateCustomer) {
                const updatedCustomers = prevCustomers.map((customer) =>
                    customer.customerCode === newCustomer.customerCode
                        ? newCustomer
                        : customer
                );
                return updatedCustomers;
            } else {
                return [...prevCustomers, newCustomer];
            }
        });
    };

    const handleUpdateId = (id) => {
        setUpdateId(id);
    };

    return (
        <Theme preset={presetGpnDefault}>
            {!showCustomerTable && (
                <>
                    <div className="table-header">
                        <Text size="3xl" weight="bold">
                            Лоты
                        </Text>
                        <Button
                            onClick={toggleCustomerTable}
                            label="Показать таблицу клиентов"
                        />
                    </div>

                    <Button
                        className="button-green"
                        size="m"
                        iconLeft={IconAdd}
                        view="primary"
                        label="Добавить новый лот"
                        onClick={() => setIsModalOpen(true)}
                    />
                    <LotTable
                        lots={lots}
                        setLots={setLots}
                        setIsModalOpen={setIsModalOpen}
                        setUpdateId={setUpdateId}
                    />
                    {isModalOpen && (
                        <LotForm
                            onClose={() => setIsModalOpen(false)}
                            onAddLot={handleAddLot}
                            updateId={updateId}
                        />
                    )}
                </>
            )}
            {showCustomerTable && (
                <>
                    <div className="table-header">
                        <Text size="3xl" weight="bold">
                            Клиенты
                        </Text>
                        <Button
                            onClick={toggleCustomerTable}
                            label={'Показать таблицу лотов'}
                        />
                    </div>

                    <Button
                        className="button-green"
                        size="m"
                        iconLeft={IconAdd}
                        view="primary"
                        label="Добавить нового клиента"
                        onClick={() => setIsModalOpen(true)}
                    />
                    <CustomerTable
                        customers={customers}
                        setCustomers={setCustomers}
                        setIsModalOpen={setIsModalOpen}
                        setUpdateId={setUpdateId}
                    />
                    {isModalOpen && (
                        <CustomerForm
                            onClose={() => setIsModalOpen(false)}
                            onAddCustomer={handleAddCustomer}
                            updateId={updateId}
                        />
                    )}
                </>
            )}
        </Theme>
    );
};

export default App;
