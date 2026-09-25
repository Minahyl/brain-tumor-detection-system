"use client";

import {useState} from "react";

import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";

import StatCard from "../components/StatCard";
import UploadPanel from "../components/UploadPanel";
import ResultPanel from "../components/ResultPanel";
import Charts from "../components/Charts";
import Metrics from "../components/Metrics";


export default function Home(){


const [result,setResult]=useState<any>(null);



return (

<div className="min-h-screen bg-[#070b18] text-white">


<Sidebar/>


<div className="ml-[280px]">


<Topbar/>


<main className="p-8 space-y-8">



<div className="
grid
xl:grid-cols-4
gap-6
">


<StatCard
title="Total Scans Analyzed"
value="1600"
status="Testing Dataset"
color="blue"
/>


<StatCard
title="Model Accuracy"
value="83.18%"
status="EfficientNetB0"
color="green"
/>


<StatCard
title="Tumors Detected"
value="4 Types"
status="MRI Classification"
color="orange"
/>


<StatCard
title="Backend Connection"
value="Active"
status="FastAPI Connected"
color="purple"
/>


</div>





<div className="
grid
xl:grid-cols-2
gap-8
">


<UploadPanel

setResult={setResult}

/>



<ResultPanel

result={result}

/>



</div>





<Charts

result={result}

/>



<Metrics/>




</main>


</div>


</div>


)

}