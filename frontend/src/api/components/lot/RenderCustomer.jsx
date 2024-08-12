import React, { useEffect, useState } from 'react';
import { Table, TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { User } from '@consta/uikit/User';
import { Sidebar } from '@consta/uikit/Sidebar';
import { IconIntroduction } from '@consta/icons/IconIntroduction';
import { Text } from '@consta/uikit/Text';
import LotService from '../../services/LotService';

const RenderCustomer = ({ customer }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const columnsLotsByCustomer: TableColumn = [
        {
            title: 'Название',
            accessor: 'lotName',
            width: 150,
            sortable: true,
        },
        {
            title: 'Цена',
            accessor: 'price',
            width: 150,
            sortable: true,
        },
    ];
    const [lotsByCustomer, setLotsByCustomer] = useState([]);
    useEffect(() => {
        LotService.getByCustomer(customer.customerCode)
            .then((response) => {
                setLotsByCustomer(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);

    return (
        <div className={'Section'}>
            <User
                name={customer.customerName}
                info={customer.customerEmail}
                iconRight={IconIntroduction}
                onIconRightClick={() => setIsSidebarOpen(true)}
                size="l"
            ></User>
            <Sidebar
                isOpen={isSidebarOpen}
                position="right"
                hasOverlay
                size="l"
                onClickOutside={() => setIsSidebarOpen(false)}
                onEsc={() => setIsSidebarOpen(false)}
                className="sidebar-custom"
            >
                <Sidebar.Content className="sidebar-content">
                    <Text
                        className="sidebar-header"
                        as="p"
                        size="2xl"
                        view="primary"
                        align="center"
                        decoration="underline"
                    >
                        {customer.customerName}
                    </Text>
                    <Text as="p" size="xl" view="primary" align="center">
                        {customer.customerEmail}
                    </Text>
                    <Table
                        className="sidebar-table"
                        columns={columnsLotsByCustomer}
                        rows={lotsByCustomer}
                        borderBetweenColumns
                        borderBetweenRows
                        stickyHeader
                        getCellWrap={(row) => 'break'}
                    />
                </Sidebar.Content>
                <Sidebar.Actions className="sidebar-actions">
                    <Button
                        size="m"
                        view="secondary"
                        label="Закрыть"
                        width="default"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                </Sidebar.Actions>
            </Sidebar>
        </div>
    );
};

export default RenderCustomer;
