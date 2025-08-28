import React from 'react';

const TestComponent = () => {
  console.log('TestComponent rendering...');
  
  return (
    <div className="p-4 bg-blue-100 border border-blue-300 rounded">
      <h2 className="text-lg font-bold text-blue-800">Test Component</h2>
      <p className="text-blue-600">This is a simple test component</p>
      <span className="text-sm text-blue-500">Test span element</span>
    </div>
  );
};

export default TestComponent;
