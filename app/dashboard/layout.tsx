'use client'

import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    SolutionOutlined,
    DashboardOutlined,
    AppstoreOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Button, Layout, Menu, theme } from 'antd';
import { UserButton } from '@clerk/nextjs';

const { Header, Sider, Content } = Layout;

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
                    background: '#ffffff',
                    borderRight: '1px solid #f0f0f0'
                }}
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
                    style={{ border: 'none' }}
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
                            icon: <HomeOutlined />,
                            label: (
                                <Link href="/dashboard/task">
                                    Task
                                </Link>
                            ),
                        },
                        {
                            key: '5',
                            icon: <SolutionOutlined />,
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
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
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
                    <div className='mr-10 mt-4'><UserButton /></div>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default RootLayout;