'use client';

import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import { TeamOutlined, GoldOutlined, SnippetsOutlined, AppstoreOutlined, CaretUpOutlined } from '@ant-design/icons';
import StatCard from '../../components/dashboard/StatCard';
import ProgressChart from '../../components/dashboard/ProgressChart';
import TrendingProducts from '../../components/dashboard/TrendingProducts';

const DashboardPage: React.FC = () => {
  const [period, setPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');

  const handlePeriodChange = (value: 'Daily' | 'Weekly' | 'Monthly') => {
    setPeriod(value);
    // fetchProgressData(value);
  };

  const progressData = {
    completed: 25,
    inProgress: 15,
    notStarted: 10,
    totalHours: '50h',
  };
    return (
        <div className="p-6 bg-zinc-100">
          <Row gutter={[16, 16]}>
            {/* Top Statistics Cards */}
            <Col xs={24} sm={12} md={6}>
              <StatCard icon={<TeamOutlined />} title="Total Users" value={18} color="yellow-500" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatCard icon={<AppstoreOutlined />} title="Total Fields" value={97} color="green-500" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatCard icon={<SnippetsOutlined />} title="Total Tasks" value={62} color="blue-500" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatCard icon={<GoldOutlined />} title="Total Products" value={245} color="purple-500" />
            </Col>

            {/* Progress Chart */}
            <Col xs={24} md={12}>
                <ProgressChart
                  completed={progressData.completed}
                  inProgress={progressData.inProgress}
                  notStarted={progressData.notStarted}
                  totalHours={progressData.totalHours}
                  period={period}
                  onPeriodChange={handlePeriodChange}
                />
            </Col>

            <Col xs={24} md={12}>
            <Card 
              title={
                <span>
                  <CaretUpOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                  Trending Products
                  <TrendingProducts />
                </span>
              }
            >
            </Card>
            </Col>

          </Row>
        </div>
    );
};

export default DashboardPage;