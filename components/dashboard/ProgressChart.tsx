'use client'

import React from 'react';
import { Progress, Card } from 'antd';

interface ProgressChartProps {
  percent: number;
  title?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ percent,}) => {
  return (
      <div className="flex flex-col items-center">
        <Progress 
          type="circle" 
          percent={percent} 
          width={200}
          format={(percent) => `${percent}%`}
        />
        <p className="mt-4 text-lg font-semibold">
          {percent < 100 ? `${100 - percent}% to go!` : 'Completed!'}
        </p>
      </div>
  );
};

export default ProgressChart;