import useSwr from 'swr';
import { Row, Button, Col, Card, BackTop } from 'antd';
import axios from 'axios';
import { within24Hours } from '../utils/time';
import { SiteMenu } from '../components/SiteMenu';
import { ItemTypes } from '../types/types';
import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
    const [feeds, setFeeds] = useState(0);
    const [pees, setPees] = useState(0);
    const [poos, setPoos] = useState(0);
    const { data, error, mutate } = useSwr('/api/tracker', fetcher);

    useEffect(() => {
        setFeeds(data?.filter((entry) => entry.type === ItemTypes.Feed && within24Hours(entry.time)).length);
        setPees(data?.filter((entry) => entry.type === ItemTypes.Pee && within24Hours(entry.time)).length);
        setPoos(data?.filter((entry) => entry.type === ItemTypes.Poo && within24Hours(entry.time)).length);
    }, [data]);

    if (error) return <div>Failed to load data</div>;
    if (!data)
        return (
            <div>
                <SiteMenu />
            </div>
        );

    const addEntry = async (type) => {
        await axios.post('/api/tracker/new', { type: type });
        mutate();
    };

    return (
        <>
            <BackTop />
            <SiteMenu />
            <Row gutter={24}>
                <Col span={8}>
                    <Card size='small' bordered={true}>
                        Feeds {feeds}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size='small' bordered={true}>
                        Pees {pees}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size='small' bordered={true}>
                        Poos {poos}
                    </Card>
                </Col>
            </Row>
            <br />
            <Row justify='center' gutter={[16, 16]}>
                <Col span={24}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Feed)}>
                        {ItemTypes.Feed}
                    </Button>
                </Col>
                <Col span={24}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Pee)}>
                        {ItemTypes.Pee}
                    </Button>
                </Col>
                <Col span={24}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Poo)}>
                        {ItemTypes.Poo}
                    </Button>
                </Col>
                <Col span={24}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Sleep)}>
                        {ItemTypes.Sleep}
                    </Button>
                </Col>
                <Col span={24}>
                    <Button type='primary' size='large' block onClick={() => addEntry(ItemTypes.Wake)}>
                        {ItemTypes.Wake}
                    </Button>
                </Col>
            </Row>
            <DataTable data={data} />
        </>
    );
}
