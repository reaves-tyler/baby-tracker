import { Button, Col, Row, Table } from 'antd';
import axios from 'axios';
import useSwr from 'swr';
import { Item } from '../types/types';
import { timeAgo } from '../utils/time';

export const DataTable = (props: { data: Item[] }) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { mutate } = useSwr('/api/tracker', fetcher);

    const removeEntry = async (e, _id) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            await axios.delete(`/api/tracker/${_id}`);
            mutate();
        }
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <Table
                        dataSource={props.data}
                        columns={[
                            {
                                title: 'Type',
                                dataIndex: 'type',
                                key: 'type',
                            },
                            {
                                title: 'Time',
                                dataIndex: 'time',
                                key: 'time',
                                render: (date: string) =>
                                    `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`,
                            },
                            {
                                title: 'Time since',
                                dataIndex: 'time',
                                key: 'time',
                                render: (date: string) => ` ${timeAgo(date)}`,
                            },
                            {
                                title: 'Remove',
                                dataIndex: '_id',
                                key: '_id',
                                render: (_id: string) => (
                                    <Button danger onClick={(e) => removeEntry(e, _id)}>
                                        X
                                    </Button>
                                ),
                            },
                        ]}
                        pagination={false}
                    />
                </Col>
            </Row>
        </>
    );
};
