import React from 'react';
import { List, Avatar } from 'antd';

const TrendingProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Grilled Chicken',
      price: 676.00,
      orderedTimes: 52,
      image: '/path-to-grilled-chicken-image.jpg'
    },
    {
      id: 2,
      name: 'Spinach Artichoke Dip',
      price: 480.00,
      orderedTimes: 48,
      image: '/path-to-spinach-artichoke-dip-image.jpg'
    },
    {
      id: 3,
      name: 'Waldorf Salad',
      price: 528.00,
      orderedTimes: 48,
      image: '/path-to-waldorf-salad-image.jpg'
    },
    {
      id: 4,
      name: 'Impossible Burger',
      price: 517.00,
      orderedTimes: 47,
      image: '/path-to-impossible-burger-image.jpg'
    },
    {
      id: 5,
      name: 'Pappardelle',
      price: 658.00,
      orderedTimes: 47,
      image: '/path-to-pappardelle-image.jpg'
    },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={products}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <div style={{ position: 'relative' }}>
                <Avatar shape="square" size={64} src={item.image} />
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: '#1890ff',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '0 0 8px 0',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  {index + 1}
                </div>
              </div>
            }
            title={<a href="#">{item.name}</a>}
            description={
              <>
                <div>US${item.price.toFixed(2)}</div>
                <div style={{ color: '#8c8c8c' }}>
                  Ordered {item.orderedTimes} times
                </div>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default TrendingProducts;