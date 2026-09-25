"use client";


import {
Network,
TestTube,
UserCircle
} from "lucide-react";



export default function Topbar(){


return(

<header

className="
h-20
border-b
border-white/10
bg-[#0b1220]
flex
items-center
justify-between
px-8
"


>


<div>


<h1 className="
text-2xl
font-bold
">

Dashboard & Detection

</h1>


<p className="
text-sm
text-gray-400
">

Upload MRI scans and connect your trained backend model

</p>


</div>





<div className="
flex
items-center
gap-4
">


<button

className="
px-4
py-2
rounded-lg
bg-indigo-500/20
border
border-indigo-500/40
text-indigo-300
flex
gap-2
items-center
"

>

<Network size={18}/>

Configure API

</button>





<button

className="
px-4
py-2
rounded-lg
bg-white/5
border
border-white/10
flex
gap-2
items-center
"

>

<TestTube size={18}/>

Sample MRI

</button>





<div className="
flex
items-center
gap-3
ml-3
">


<UserCircle
size={40}
className="text-indigo-400"
/>


<div>

<p className="font-semibold">

Dr. AI System

</p>

<p className="text-xs text-gray-400">

Lead Neurologist

</p>


</div>


</div>



</div>


</header>


)


}