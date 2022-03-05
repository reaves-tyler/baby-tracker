import Link from 'next/link';
import { Button, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

export const SiteMenu = () => {
    const router = useRouter();
    const { data: session } = useSession();

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
                <Menu.Item>
                    {session ? (
                        <Button onClick={() => signOut()}>Sign out</Button>
                    ) : (
                        <Button onClick={() => signIn()}>Sign in</Button>
                    )}
                </Menu.Item>
            </Menu>
            <br />
        </>
    );
};
