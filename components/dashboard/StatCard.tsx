import React from 'react'
import { Card } from 'antd';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    color: string;
  }
  

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => {
  return (
    <Card>
    <div className="flex items-center">
      <div className={`text-${color} text-3xl mr-4`}>{icon}</div>
      <div>
        <div className="text-gray-500">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  </Card>
  )
};

export default StatCard
