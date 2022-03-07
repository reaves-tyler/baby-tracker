import useSwr from 'swr';
import { BackTop } from 'antd';
import { SiteMenu } from '../components/SiteMenu';
import { DataTable } from '../components/DataTable';
import { ItemTypes } from '../types/types';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Diapers() {
    const { data, error } = useSwr('/api/tracker', fetcher);

    if (error) return <div>Failed to load data</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <>
            <BackTop />
            <SiteMenu />
            <br />
            <DataTable data={data.filter((entry) => entry.type === ItemTypes.Pee || entry.type === ItemTypes.Poo)} />
        </>
    );
}
