import Link from 'next/link';
import { Menu } from 'antd';
import { useRouter } from 'next/router';

export const SiteMenu = () => {
    const router = useRouter();
    console.log(router.route);

    return (
        <>
            <Menu mode='horizontal' selectedKeys={[router.route]}>
                <Menu.Item key='/'>
                    <Link href='/'>Home</Link>
                </Menu.Item>
                <Menu.Item key='/diapers'>
                    <Link href='/diapers'>Diapers</Link>
                </Menu.Item>
                <Menu.Item key='/food'>
                    <Link href='/food'>Food</Link>
                </Menu.Item>
            </Menu>
            <br />
        </>
    );
};
