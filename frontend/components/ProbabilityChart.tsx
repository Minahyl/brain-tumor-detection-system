"use client";

import {
PieChart,
Pie,
Cell,
Tooltip,
BarChart,
Bar,
XAxis,
YAxis
} from "recharts";


export default function ProbabilityChart(
{
data
}:any
){


const chartData =
Object.keys(data).map(
(key)=>({
name:key,
value:data[key]
})
);


const colors=[
"#06b6d4",
"#8b5cf6",
"#22c55e",
"#ef4444"
];


return (

<div className="grid md:grid-cols-2 gap-6">


<div className="bg-[#111827] rounded-3xl p-5">

<h2 className="mb-4">
Probability Distribution
</h2>


<PieChart width={300} height={300}>

<Pie

data={chartData}

dataKey="value"

nameKey="name"

cx="50%"

cy="50%"

outerRadius={100}

>

{
chartData.map(
(_,index)=>(

<Cell
key={index}
fill={colors[index]}
/>

)
)
}

</Pie>


<Tooltip/>

</PieChart>


</div>



<div className="bg-[#111827] rounded-3xl p-5">


<h2 className="mb-4">
Class Probability
</h2>


<BarChart
width={350}
height={300}
data={chartData}
>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Bar
dataKey="value"
fill="#06b6d4"
/>


</BarChart>


</div>


</div>

)

}