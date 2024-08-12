import React, { useEffect, useState } from 'react';
import { Table, TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconCheck } from '@consta/icons/IconCheck';
import { IconClear } from '@consta/icons/IconClear';
import { IconEdit } from '@consta/icons/IconEdit';
import CustomerService from '../../services/CustomerService';

const renderBooleanCell = (value) => {
    return value ? (
        <IconCheck view="success" size="l" />
    ) : (
        <IconClear view="alert" size="l" />
    );
};

const CustomerTable = ({
    customers,
    setCustomers,
    setIsModalOpen,
    setUpdateId,
}) => {
    useEffect(() => {
        CustomerService.getAll()
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);

    const handleDelete = (customerCode) => {
        CustomerService.delete(customerCode).then((response) => {
            setCustomers((prevCustomers) =>
                prevCustomers.filter(
                    (customer) => customer.customerCode !== customerCode
                )
            );
        });
    };

    const columns: TableColumn = [
        {
            title: 'ID',
            accessor: 'customerCode',
            width: 200,
            sortable: true,
        },
        {
            title: 'ФИО',
            accessor: 'customerName',
            width: 290,
            sortable: true,
        },
        {
            title: 'ИНН',
            accessor: 'customerInn',
            width: 150,
        },
        {
            title: 'КПП',
            accessor: 'customerKpp',
            width: 140,
            sortable: true,
        },
        {
            title: 'Почтовый адрес',
            accessor: 'customerPostalAddress',
            width: 250,
        },
        {
            title: 'Юридический адрес',
            accessor: 'customerLegalAddress',
            width: 250,
        },
        {
            title: 'Почта клиента',
            accessor: 'customerEmail',
            width: 250,
            sortable: true,
        },
        {
            title: 'Юр. лицо',
            accessor: 'organization',
            width: 90,
            sortable: true,
            renderCell: (row) => renderBooleanCell(row.organization),
        },
        {
            title: 'Физ. лицо',
            accessor: 'person',
            width: 90,
            sortable: true,
            renderCell: (row) => renderBooleanCell(row.person),
        },
        {
            title: 'Действия',
            accessor: 'actions',
            renderCell: (row) => (
                <div className="button-container">
                    <Button
                        className="button-yellow"
                        size="m"
                        iconLeft={IconEdit}
                        onClick={() => {
                            setIsModalOpen(true);
                            setUpdateId(row.customerCode);
                        }}
                    />
                    <Button
                        className="button-red"
                        size="m"
                        iconLeft={IconTrash}
                        onClick={() => {
                            handleDelete(row.customerCode);
                        }}
                    />
                </div>
            ),
            align: 'center',
            width: 150,
        },
    ];

    return (
        <Table
            columns={columns}
            rows={customers}
            borderBetweenColumns
            borderBetweenRows
            stickyHeader="true"
            zebraStriped="odd"
            getCellWrap={(row) => 'break'}
        />
    );
};

export default CustomerTable;
