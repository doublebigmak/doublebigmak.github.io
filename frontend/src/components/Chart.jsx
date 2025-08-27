import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';


function getTickValues(dataMin, dataMax) {
  const range = dataMax - dataMin;

  let interval = 1;

  if (range <=5 ) interval = 0.5;
  else if (range > 5 && range <= 10) interval = 1;
  else if (range > 10 && range <= 50) interval = 5;
  else if (range > 50 && range <= 100) interval = 10;
  else if (range > 100 && range <= 200) interval = 20;
  else if (range > 200 && range <= 500) interval = 50;
  else if (range > 500) interval = 100;

  const ticks = [];
  let start = Math.floor(dataMin / interval) * interval;
  let end = Math.ceil(dataMax / interval) * interval;

  for (let i = start; i <= end; i += interval) {
    ticks.push(i);
  }

  return ticks;
}

export default function Chart({ prices, showDates }) {

    const closes = prices.map(p => p.close);
    const dataMin = Math.min(...closes);
    const dataMax = Math.max(...closes);
    const tickValues = getTickValues(dataMin, dataMax);
    
    let tickDecimal = 0;
    if (dataMax-dataMin <= 5) tickDecimal = 1;
  return (
    <div className="bg-[#121212] p-2 rounded">
      <ResponsiveContainer width="100%" height={300} style={{ backgroundColor: '#121212', borderRadius: '4px' }}>
      <LineChart data={prices}
      margin={{right:0, left:0}}
      >
        <XAxis dataKey="date" hide = {!showDates}
        padding={{ left: 0, right: 0 }} /> {/* hide to keep it mystery! */}
        <YAxis
        ticks ={tickValues}
        domain={['dataMin', 'dataMax']}
        tick={{ fill: '#e0e0e0', fontSize: 12 }}
        tickFormatter = {(value) => `$${value.toFixed(tickDecimal)}`}
        padding={{ top: 20, bottom: 20 }}
        />
        <CartesianGrid
            stroke="#333"
            strokeDasharray="3 3"
            vertical={false}
        />



        <Tooltip 
            contentStyle={{
              backgroundColor: '#1c1c1c',
              border: 'none',
              borderRadius: '4px',
              color: '#fff'
            }}
            formatter={(value,name) => [`$${value.toFixed(2)}`,null]}
            labelFormatter={() => ""}
        />
        <Line
          type="linear"
          dataKey="close"
          stroke="#00ff99"
          dot={false}
          strokeWidth={2.5}
        />
      </LineChart>
    </ResponsiveContainer>
    </div>
   
  );
}