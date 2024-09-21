'use client'

import React from 'react';
import { Progress, Select, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

interface ProgressChartProps {
  completed: number;
  inProgress: number;
  notStarted: number;
  totalHours: string;
  period: 'Daily' | 'Weekly' | 'Monthly';
  onPeriodChange: (value: 'Daily' | 'Weekly' | 'Monthly') => void;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  completed,
  inProgress,
  notStarted,
  totalHours,
  period,
  onPeriodChange,
}) => {
  const total = completed + inProgress + notStarted;
  const completedPercent = Math.round((completed / total) * 100);
  const inProgressPercent = Math.round((inProgress / total) * 100);
  const notStartedPercent = Math.round((notStarted / total) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Progress</h2>
        <Select
          value={period}
          onChange={onPeriodChange}
          style={{ width: 120 }}
        >
          <Select.Option value="Daily">Daily</Select.Option>
          <Select.Option value="Weekly">Weekly</Select.Option>
          <Select.Option value="Monthly">Monthly</Select.Option>
        </Select>
      </div>
      
      <div className="relative">
        <Tooltip title={`Completed: ${completed}`}>
          <Progress
            type="circle"
            percent={completedPercent}
            strokeColor="#52c41a"
            trailColor="#f0f0f0"
            width={200}
            format={() => ''}
          />
        </Tooltip>
        <Tooltip title={`In Progress: ${inProgress}`}>
          <Progress
            type="circle"
            percent={inProgressPercent}
            strokeColor="#1890ff"
            trailColor="transparent"
            width={160}
            format={() => ''}
            className="absolute top-5 left-5"
          />
        </Tooltip>
        <Tooltip title={`Not Started: ${notStarted}`}>
          <Progress
            type="circle"
            percent={notStartedPercent}
            strokeColor="#ff4d4f"
            trailColor="transparent"
            width={120}
            format={() => ''}
            className="absolute top-10 left-10"
          />
        </Tooltip>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Total hours: {totalHours}</p>
      </div>
      
      <div className="mt-4 flex justify-between">
        <div>
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          {completed}/{total} Completed
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          {inProgress}/{total} In progress
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          {notStarted}/{total} Not started
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;