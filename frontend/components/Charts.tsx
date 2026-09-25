"use client";

import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer,
Legend
} from "recharts";



export default function Charts({
result
}:any){



const colors:any={

glioma:"#8b5cf6",

meningioma:"#f59e0b",

notumor:"#22c55e",

pituitary:"#06b6d4"

};




const data = result

?

Object.entries(result.probabilities)

.map(([name,value]:any)=>(

{
name:
name.charAt(0).toUpperCase()
+
name.slice(1),

value:Number(value)

}

))


:

[

{
name:"Glioma",
value:25
},

{
name:"Meningioma",
value:30
},

{
name:"Pituitary",
value:25
},

{
name:"Notumor",
value:20
}

];







return (

<div className="card p-8">



<h2 className="text-xl font-bold mb-5">

AI Prediction Confidence Analysis

</h2>




<div className="h-80">


<ResponsiveContainer>


<PieChart>


<Pie

data={data}

dataKey="value"

innerRadius={75}

outerRadius={115}

paddingAngle={3}

>


{

data.map((item,index)=>(


<Cell

key={index}

fill={
colors[
item.name
.toLowerCase()
]
}


/>


))


}



</Pie>


<Tooltip/>


<Legend/>


</PieChart>


</ResponsiveContainer>


</div>



</div>


)

}