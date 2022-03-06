import useSwr from 'swr';
import { Row, Button, Table, Col, BackTop } from 'antd';
import axios from 'axios';
import { timeAgo } from '../utils/time';
import { SiteMenu } from '../components/SiteMenu';
import { ItemTypes } from '../types/types';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Diapers() {
    const { data, error, mutate } = useSwr('/api/tracker', fetcher);

    if (error) return <div>Failed to load data</div>;
    if (!data) return <div>Loading...</div>;

    const removeEntry = async (e, _id) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            await axios.delete(`/api/tracker/${_id}`);
            mutate();
        }
    };

    return (
        <>
            <BackTop />
            <SiteMenu />
            <br />
            <Row>
                <Col span={24}>
                    <Table
                        dataSource={data.filter(
                            (entry) => entry.type === ItemTypes.Pee || entry.type === ItemTypes.Poo
                        )}
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
}
