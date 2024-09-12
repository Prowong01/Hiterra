'use client';

import React from 'react';
import { Spin } from 'antd';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Spin size="large" />
        </div>
    );
};

export default Loader;