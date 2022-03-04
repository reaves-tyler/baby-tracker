import useSwr from 'swr';
import { Row, Button, Table, Col } from 'antd';
import axios from 'axios';
import { timeAgo } from '../utils/time';
import { SiteMenu } from '../components/SiteMenu';
import { ItemTypes } from '../types/types';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
    const { data, error, mutate } = useSwr('/api/tracker', fetcher);

    if (error) return <div>Failed to load data</div>;
    if (!data) return <div>Loading...</div>;

    const removeEntry = async (e, _id) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            await axios.delete(`/api/tracker/${_id}`);
            mutate();
        }
    };

    const addEntry = async (type) => {
        await axios.post('/api/tracker/new', { type: type });
        mutate();
    };

    return (
        <>
            <SiteMenu />
            <br />
            <Row justify='center' gutter={[16, 16]}>
                <Col span={12}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Feed)}>
                        {ItemTypes.Feed}
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Pump)}>
                        {ItemTypes.Pump}
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Sleep)}>
                        {ItemTypes.Sleep}
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Wake)}>
                        {ItemTypes.Wake}
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Pee)}>
                        {ItemTypes.Pee}
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Poo)}>
                        {ItemTypes.Poo}
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Table
                        dataSource={data}
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
                    />
                </Col>
            </Row>
        </>
    );
}
