'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    GoldOutlined,
    DashboardOutlined,
    AppstoreOutlined,
    SnippetsOutlined,
    DeploymentUnitOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const isDashboard = pathname === '/dashboard';
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                style={{
                    backgroundColor: 'rgb(244 244 245)',
                    borderRight: '1px solid #f0f0f0'
                }}
                className='bg-zinc-100'
            >
                <div style={{
                    height: '64px',
                    margin: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        src="/logo.png"
                        width={50}
                        height={52}
                        alt="logo"
                        style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                        }}
                    />
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ border: 'none', backgroundColor: 'rgb(244 244 245)' }}
                    items={[
                        {
                            key: '1',
                            icon: <DashboardOutlined />,
                            label: (
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            ),
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: (
                                <Link href="/dashboard/team">
                                    Team
                                </Link>
                            ),
                        },
                        {
                            key: '3',
                            icon: <AppstoreOutlined />,
                            label: (
                                <Link href="/dashboard/field">
                                    Field
                                </Link>
                            ),
                        },
                        {
                            key: '4',
                            icon: <SnippetsOutlined />,
                            label: (
                                <Link href="/dashboard/task">
                                    Task
                                </Link>
                            ),
                        },
                        {
                            key: '5',
                            icon: <GoldOutlined />,
                            label: (
                                <Link href="/dashboard/product">
                                    Product
                                </Link>
                            ),
                        },
                        {
                            key: '6',
                            icon: <DeploymentUnitOutlined />,
                            label: (
                                <Link href="/dashboard/analytic">
                                    Analytic
                                </Link>
                            ),
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: 0,
                    // background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                    className='bg-zinc-100'
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='mr-10 mt-4'><UserButton showName={true} /></div>

                </Header>
                <Content
                    style={{
                        // margin: '24px 16px',
                        padding: 18,
                        minHeight: 280,
                        borderRadius: borderRadiusLG,
                        ...(isDashboard ? {} : { background: colorBgContainer }),
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default RootLayout;