export default function Performance(){

return (

<div className="
grid
md:grid-cols-4
gap-5
">


{
[
["Accuracy","83.18%"],
["Model","EfficientNetB0"],
["Classes","4"],
["Framework","TensorFlow"]

].map(
(item)=>


<div
key={item[0]}
className="
bg-[#111827]
p-6
rounded-2xl
"
>

<p className="text-gray-400">
{item[0]}
</p>

<h2 className="text-xl font-bold mt-2">
{item[1]}
</h2>


</div>

)
}



</div>

)

}