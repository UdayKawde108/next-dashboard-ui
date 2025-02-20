"use client"
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import style from 'styled-jsx/style';





const CountChart = ({Men,Women}:{Men:number;Women:number}) => {

  const data = [
    {
      name: 'Total',
      count:Men+Women,
      fill: 'white',
    },
    {
      name: 'Women',
      count:Women,
      fill: '#C3EBFA',
    },
    {
      name: 'Men',
      count: Men,
      fill: '#FAE27C',
    },
    
      
  ];
  return (
    <div className=' relative w-full h-[75%]'>
        <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            
            background
          
            dataKey="count"
          />
          
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src="/maleFemale.png" alt={''} width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
      </div>
       
  )
}

export default CountChart