import useSwr from 'swr';
import { Row, Button, Table, Col } from 'antd';
import axios from 'axios';
import { timeAgo } from '../utils/time';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
    const { data, error, mutate } = useSwr('/api/tracker', fetcher);

    if (error) return <div>Failed to load data</div>;
    if (!data) return <div>Loading...</div>;

    const removeEntry = async (e, _id) => {
        await axios.delete(`/api/tracker/${_id}`);
        mutate();
    };

    const newFeed = async () => {
        await axios.post('/api/tracker/new', { type: 'Feed' });
        mutate();
    };

    const newSleep = async () => {
        await axios.post('/api/tracker/new', { type: 'Sleep' });
        mutate();
    };

    const newWake = async () => {
        await axios.post('/api/tracker/new', { type: 'Wake' });
        mutate();
    };

    const newPee = async () => {
        await axios.post('/api/tracker/new', { type: 'Pee' });
        mutate();
    };

    const newPoo = async () => {
        await axios.post('/api/tracker/new', { type: 'Poo' });
        mutate();
    };

    return (
        <>
            <Row justify='center' gutter={[16, 16]}>
                <Col span={24}>
                    {' '}
                    <Button type='primary' size='large' block onClick={newFeed}>
                        Feed
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type='primary' size='large' block onClick={newSleep}>
                        Sleep
                    </Button>
                </Col>
                <Col span={12}>
                    {' '}
                    <Button type='primary' size='large' block onClick={newWake}>
                        Wake
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type='primary' size='large' block onClick={newPee}>
                        Pee
                    </Button>
                </Col>{' '}
                <Col span={12}>
                    <Button type='primary' size='large' block onClick={newPoo}>
                        Poo
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
                                        Remove
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
}
