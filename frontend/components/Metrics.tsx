export default function Metrics(){


const metrics=[

{
name:"Accuracy",
value:83
},

{
name:"Precision",
value:84
},

{
name:"Recall",
value:83
},

{
name:"F1 Score",
value:82
}

];



return (

<div className="card p-8">


<h2 className="text-xl font-bold mb-5">

Neural Core Metrics

</h2>



{

metrics.map((m)=>(


<div

key={m.name}

className="mb-5"

>



<div className="
flex
justify-between
">

<span>

{m.name}

</span>


<span>

{m.value}%

</span>


</div>



<div className="
h-2
bg-gray-700
rounded
mt-2
">


<div

className="
h-2
bg-indigo-500
rounded
"

style={{

width:`${m.value}%`

}}

/>


</div>


</div>


))


}



</div>

)

}