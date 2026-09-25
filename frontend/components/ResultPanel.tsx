"use client";

import {useEffect, useState} from "react";


export default function ResultPanel({
result
}:any){


const [show,setShow]=useState(false);



useEffect(()=>{

if(result){

setShow(false);


setTimeout(()=>{

setShow(true);

},100);

}

},[result]);





const colors:any={

glioma:"#8b5cf6",

meningioma:"#f59e0b",

notumor:"#22c55e",

pituitary:"#06b6d4"

};




return (

<div className="
bg-[#111827]
border
border-white/10
rounded-2xl
p-8
overflow-hidden
">



<div className="
flex
justify-between
items-center
mb-6
">


<h2 className="
text-xl
font-bold
">

Diagnostic Classification Results

</h2>



<span className="
bg-gray-700
px-4
py-1
rounded-full
text-xs
">

{
result
?
"Analysis Complete"
:
"Awaiting Scan"
}

</span>


</div>





{

!result ?


<div className="
h-64
flex
items-center
justify-center
text-gray-500
">

Upload MRI scan to generate diagnosis

</div>



:


<div

className={`
transition-all
duration-700
ease-out

${
show
?
"opacity-100 translate-y-0"
:
"opacity-0 translate-y-10"
}

`}

>




<div className="
bg-[#0b1220]
rounded-xl
p-5
mb-7
">



<p className="
text-gray-400
">

Detected Tumor Type

</p>




<div className="
overflow-hidden
mt-2
">


<h1

className={`
text-4xl
font-bold
text-cyan-400

transition-all
duration-1000
ease-out

${
show
?
"translate-x-0 opacity-100"
:
"-translate-x-full opacity-0"
}

`}

>

{result.prediction}

</h1>


</div>






<p className="mt-4">

Confidence:

<span className="
text-green-400
font-bold
ml-2
">

{result.confidence}%

</span>


</p>



{/* Confidence bar */}

<div className="
h-3
bg-gray-700
rounded-full
mt-4
overflow-hidden
">


<div

className="
h-full
bg-green-500
rounded-full
transition-all
duration-[1500ms]
ease-out
"

style={{

width:
show
?
`${result.confidence}%`
:
"0%"

}}


/>


</div>



</div>







<h3 className="
font-semibold
mb-5
">

Class Probability

</h3>





{

Object.entries(result.probabilities)

.map(([name,value]:any)=>(


<div
key={name}
className="mb-5"
>




<div className="
flex
justify-between
items-center
mb-2
">


<div className="
flex
items-center
gap-3
">


<span

className="
w-3
h-3
rounded-full
"

style={{

backgroundColor:
colors[name]

}}

/>



<span className="capitalize">

{name}

</span>


</div>




<span>

{value}%

</span>


</div>





<div className="
h-3
bg-gray-700
rounded-full
overflow-hidden
">


<div

className="
h-full
rounded-full
transition-all
duration-[1200ms]
ease-out
"

style={{

backgroundColor:
colors[name],

width:
show
?
`${value}%`
:
"0%"

}}


/>


</div>




</div>


))

}



</div>


}




</div>


)

}