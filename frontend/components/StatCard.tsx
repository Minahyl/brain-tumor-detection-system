"use client";


export default function StatCard({
title,
value,
status,
color="blue"
}:any){



const styles:any={


blue:{
border:"border-blue-500/40",
icon:"bg-blue-500/20",
status:"text-blue-400"
},


green:{
border:"border-emerald-500/40",
icon:"bg-emerald-500/20",
status:"text-emerald-400"
},


orange:{
border:"border-orange-500/40",
icon:"bg-orange-500/20",
status:"text-orange-400"
},


purple:{
border:"border-purple-500/40",
icon:"bg-purple-500/20",
status:"text-purple-400"
}


};




const currentStyle =
styles[color] || styles.blue;




return (

<div

className={`
bg-[#111827]
border
${currentStyle.border}
rounded-2xl
p-6
transition
duration-300
hover:scale-[1.02]
shadow-lg
`}

>



<div className="
flex
justify-between
items-start
">


<div>


<p className="
text-gray-400
text-sm
">

{title}

</p>




<h2 className="
text-3xl
font-bold
mt-3
text-white
">

{value}

</h2>




<p className={`
mt-2
text-sm
${currentStyle.status}
`}>

{status}

</p>


</div>





<div

className={`
w-12
h-12
rounded-xl
${currentStyle.icon}
flex
items-center
justify-center
`}

>


<div className="
w-3
h-3
rounded-full
bg-current
">

</div>


</div>





</div>


</div>


)

}