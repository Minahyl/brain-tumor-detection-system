"use client";


import {

LayoutDashboard,
BarChart3,
FileText,
Settings,
Brain,
ShieldCheck

} from "lucide-react";



export default function Sidebar(){


return(

<aside

className="
fixed
left-0
top-0
w-[280px]
h-screen
bg-[#0b1220]
border-r
border-white/10
flex
flex-col
"

>


<div className="
p-6
border-b
border-white/10
">


<div className="
flex
gap-3
items-center
">


<div className="
bg-gradient-to-br
from-indigo-500
to-purple-600
p-3
rounded-xl
">


<Brain size={25}/>


</div>


<div>


<h1 className="
text-xl
font-bold
">

NeuroScan

<span className="text-indigo-400">
 AI
</span>

</h1>


<p className="
text-xs
text-gray-400
">

Clinical Diagnostic v2.4

</p>


</div>


</div>


</div>





<nav className="
p-5
space-y-3
flex-1
">


<Menu
icon={<LayoutDashboard/>}
text="Dashboard"
active
/>

<Menu
icon={<BarChart3/>}
text="Analytics"
/>

<Menu
icon={<FileText/>}
text="Reports"
/>

<Menu
icon={<Settings/>}
text="Settings"
/>


</nav>






<div className="p-5">


<div className="
card
p-4
">


<div className="
flex
items-center
gap-3
">


<div className="
w-3
h-3
bg-green-400
rounded-full
"/>


<div>

<p className="font-semibold text-sm">

AI Model Active

</p>


<p className="text-xs text-gray-400">

Custom Backend Ready

</p>


</div>


<ShieldCheck
className="ml-auto text-indigo-400"
/>


</div>


</div>


</div>



</aside>


)

}




function Menu(
{
icon,
text,
active
}:any

){


return(

<div

className={`
flex
gap-3
items-center
p-3
rounded-xl

${active?

"bg-indigo-600/30 text-white"

:

"text-gray-400 hover:bg-white/5"

}

`}

>

{icon}

{text}


</div>


)

}