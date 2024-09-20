import React from 'react';
import { Card, Row, Col, Progress, Table, Calendar } from 'antd';
import { BookOutlined, CheckCircleOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';
import StatCard from '../../components/dashboard/StatCard';
import ProgressChart from '../../components/dashboard/ProgressChart';

const DashboardPage: React.FC = () => {
    return (
        <div className="p-6">
      <Row gutter={[16, 16]}>
        {/* Top Statistics Cards */}
        <Col xs={24} sm={12} md={6}>
          <StatCard icon={<TeamOutlined />} title="Total Users" value={18} color="teal" />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard icon={<CheckCircleOutlined />} title="Total Fields" value={97} color="green" />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard icon={<TrophyOutlined />} title="Total Tasks" value={62} color="blue" />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard icon={<TeamOutlined />} title="Total Products" value={245} color="purple" />
        </Col>

        {/* Progress Chart */}
        <Col xs={24} md={12}>
          <Card title="Task Progress">
            <ProgressChart percent={45}/>
          </Card>
        </Col>

        {/* Study Statistics */}
        <Col xs={24} md={12}>
          {/* <Card title="Study Statistics">
            <StudyHeatmap />
          </Card> */}
        </Col>

        {/* Upcoming Exams */}
        <Col xs={24}>
          {/* <Card title="Upcoming Exams">
            <UpcomingExams />
          </Card> */}
        </Col>
      </Row>
    </div>
    );
};

export default DashboardPage;