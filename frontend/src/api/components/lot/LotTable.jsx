import React, { useEffect, useState } from 'react';
import { Table, TableColumn, TableTextFilter } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconEdit } from '@consta/icons/IconEdit';
import LotService from '../../services/LotService';
import RenderCustomer from './RenderCustomer';

const filters = [
    {
        id: 'currencyFilter',
        name: 'Выбранные значения цены: ',
        field: 'currencyCode',
        filterer: (
            cellValue,
            filterValues: Array<{ value: string, name: string }>
        ) => {
            return filterValues.some(
                (filterValue) => filterValue && filterValue.value === cellValue
            );
        },
        component: {
            name: TableTextFilter,
            props: {
                withSearch: true,
                items: [
                    { name: 'RUB', value: 'RUB' },
                    { name: 'USD', value: 'USD' },
                    { name: 'EUR', value: 'EUR' },
                ],
            },
        },
    },
    {
        id: 'ndsFilter',
        name: 'Выбранные значения НДС: ',
        field: 'ndsRate',
        filterer: (
            cellValue,
            filterValues: Array<{ value: string, name: string }>
        ) => {
            return filterValues.some(
                (filterValue) => filterValue && filterValue.value === cellValue
            );
        },
        component: {
            name: TableTextFilter,
            props: {
                withSearch: true,
                items: [
                    { name: 'Без НДС', value: 'Без НДС' },
                    { name: '18%', value: '18%' },
                    { name: '20%', value: '20%' },
                ],
            },
        },
    },
];

const LotTable = ({ lots, setLots, setIsModalOpen, setUpdateId }) => {
    useEffect(() => {
        LotService.getAll()
            .then((response) => {
                setLots(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [setLots]);

    const handleDelete = (lotId) => {
        LotService.delete(lotId).then((response) => {
            setLots((prevLot) => prevLot.filter((lot) => lot.lotId !== lotId));
        });
    };

    const columns: TableColumn = [
        {
            title: 'ID',
            accessor: 'lotId',
            width: 150,
            sortable: true,
        },
        {
            title: 'Название',
            accessor: 'lotName',
            width: 150,
            sortable: true,
        },
        {
            title: 'Описание',
            accessor: 'lotDescription',
            width: 300,
        },
        {
            title: 'Цена',
            accessor: 'price',
            width: 150,
            sortable: true,
        },
        {
            title: 'Валюта',
            accessor: 'currencyCode',
            width: 100,
        },
        {
            title: 'Ставка НДС',
            accessor: 'ndsRate',
            width: 130,
        },
        {
            title: 'Клиент',
            accessor: 'customer',
            width: 300,
            sortable: true,
            renderCell: (row) => <RenderCustomer customer={row.customer} />,
        },
        {
            title: 'Адрес доставки',
            accessor: 'placeDelivery',
            width: 200,
            sortable: true,
        },
        {
            title: 'Дата доставки',
            accessor: 'dateDelivery',
            width: 200,
            sortable: true,
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
                            setUpdateId(row.lotId);
                        }}
                    />
                    <Button
                        className="button-red"
                        size="m"
                        iconLeft={IconTrash}
                        onClick={() => {
                            handleDelete(row.lotId);
                        }}
                    />
                </div>
            ),
            align: 'center',
            width: 100,
        },
    ];

    return (
        <Table
            columns={columns}
            rows={lots}
            filters={filters}
            borderBetweenColumns
            borderBetweenRows
            stickyHeader="true"
            zebraStriped="odd"
            getCellWrap={(row) => 'break'}
        />
    );
};

export default LotTable;
