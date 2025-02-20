"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    income: 4000,
    expense: 0,
    
  },
  {
    name: 'Feb',
    income: 40,
    expense: 2,
  },
  {
    name: 'Mar',
    income: 40,
    expense: 58,
  },
  {
    name: 'Apr',
    income: 57,
    expense: 25,
  },
  {
    name: 'May',
    income: 85,
    expense: 52,
  },
  {
    name: 'Jun',
    income: 55,
    expense: 20,
  },
  {
    name: 'Jul',
    income: 40,
    expense: 24,
  },

  {
    name: 'Aug',
    income: 45,
    expense: 20,
  },
  {
    name: 'Sep',
    income: 44,
    expense: 24,
  },
  {
    name: 'Oct',
    income: 50,
    expense: 24,
  },
  {
    name: 'Nov',
    income: 40,
    expense: 28,
  },
  {
    name: 'Dec',
    income: 45,
    expense: 25,
  },
];

import Image from 'next/image';
const FinanceChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* TITLE */}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Finance</h1>
            <Image src="/moreDark.png" alt="" width={20} height={20}/>
        </div>
        
        <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke='black'/>
          <XAxis dataKey="name" tick={{fill:"#d1d5db"}} tickLine={false} tickMargin={10}/>
          <YAxis tick={{fill:"#d1d5db"}} tickLine={false}/>
          <Tooltip />
          <Legend align='center' verticalAlign='top' wrapperStyle={{paddingTop:"10px", paddingBottom:"30px"}}/>
          <Line type="monotone" dataKey="income" stroke="#C3EBFA" activeDot={{ r: 25 }} />
          <Line type="monotone" dataKey="expense" stroke="#FAE27C" />
        </LineChart>
      </ResponsiveContainer>
        </div>
  )
}

export default FinanceChart