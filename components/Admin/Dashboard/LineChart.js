import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import React, { useState } from "react";
import { Box } from "@mui/material";

const LineChartDb = (props) => {
//   const [data, setData] = useState(props.data);
const data = [
    {
      name: 'มกราคม',
      program: 4000,
      course: 2400,
      media: 2400,
    },
    {
      name: 'กุมภาพันธ์',
      program: 3000,
      course: 1398,
      media: 2210,
    },
    {
      name: 'มีนาคม',
      program: 2000,
      course: 9800,
      media: 2290,
    },
    {
      name: 'เมษายน',
      program: 2780,
      course: 3908,
      media: 2000,
    },
    {
      name: 'พฤษภาคม',
      program: 1890,
      course: 4800,
      media: 2181,
    },
    {
      name: 'มิถุนายน',
      program: 2390,
      course: 3800,
      media: 2500,
    },
    {
      name: 'กรกฏาคม',
      program: 3490,
      course: 4300,
      media: 2100,
    },
    {
        name: 'สิงหาคม',
        program: 3490,
        course: 4300,
        media: 2100,
      },
      {
        name: 'กันยายน',
        program: 3490,
        course: 4300,
        media: 2100,
      },
      {
        name: 'ตุลาคม',
        program: 3490,
        course: 4300,
        media: 2100,
      },
      {
        name: 'พฤศจิกายน',
        program: 3490,
        course: 4300,
        media: 2100,
      },
      {
        name: 'ธันวาคม',
        program: 3490,
        course: 4300,
        media: 2100,
      },
  ];

  return (
    <Box sx={{ wdith: "100%", height: "100%" }}>
      <BarChart width={1100} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="program" fill="#8884d8" />
        <Bar dataKey="course" fill="#82ca9d" />
        <Bar dataKey="media" fill="#ffc658" />

      </BarChart>
    </Box>
  );
};

export default LineChartDb;
