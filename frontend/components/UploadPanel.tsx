"use client";

import {useState} from "react";

import {
UploadCloud,
Trash2
} from "lucide-react";



export default function UploadPanel({
setResult
}:any){



const [file,setFile]=useState<File|null>(null);

const [preview,setPreview]=useState("");

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");





const uploadImage=(e:any)=>{


const img=e.target.files[0];


if(img){


setFile(img);


setPreview(
URL.createObjectURL(img)
);


setError("");

}


};






const analyze=async()=>{


if(!file){

setError("Upload MRI first");

return;

}



try{


setLoading(true);

setError("");



const form=new FormData();


form.append(
"file",
file
);





const res=await fetch(

"http://127.0.0.1:8000/predict",

{

method:"POST",

body:form

}

);





if(!res.ok){

throw new Error();

}



const data=await res.json();



setResult(data);



}

catch(error){


setError(
"Backend connection failed"
);


}

finally{


setLoading(false);


}



};







const clearScan=()=>{


setFile(null);

setPreview("");

setResult(null);

setError("");

};







return(


<div className="card p-8">





<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-xl
font-bold
">

MRI Scan Input

</h2>




<span className="
bg-indigo-500/20
px-3
py-1
rounded-full
text-xs
">

PNG/JPG

</span>



</div>









<label

className={`

border-2

border-dashed

border-gray-600

rounded-xl

flex

flex-col

items-center

justify-center

cursor-pointer

hover:border-indigo-500

transition-all

duration-500


${

preview

?

"h-24"

:

"h-64"

}


`}

>





<UploadCloud

size={

preview
?
30
:
45

}

className="
text-indigo-400
transition-all
duration-500
"

/>






<p className="
mt-3
font-medium
">


{

preview

?

"Upload another MRI scan"

:

"Drag & Drop MRI scan here"

}



</p>





<p className="
text-gray-400
text-sm
">

{

preview

?

"Click to replace image"

:

"or browse files"

}


</p>






<input


type="file"


accept="image/*"


className="hidden"


onChange={uploadImage}


/>






</label>










{

preview &&


<div

className="

mt-5

overflow-hidden

rounded-xl

animate-in

fade-in

duration-700

"


>


<img


src={preview}


className="

w-full

h-80

object-cover

rounded-xl

transition-transform

duration-700

hover:scale-105

"


/>



</div>



}









<button


onClick={analyze}


disabled={loading}


className="


mt-6


w-full


bg-indigo-600


hover:bg-indigo-500


py-3


rounded-xl


font-bold


transition


disabled:opacity-50


"


>



{


loading

?

"Analyzing MRI..."

:

"🧠 Run Neural Diagnosis"


}



</button>









<button


onClick={clearScan}


className="


mt-3


w-full


bg-white/5


hover:bg-white/10


py-3


rounded-xl


transition


"

>


<Trash2

size={16}

className="inline mr-2"

/>


Clear Scan



</button>









{

error &&


<p className="

text-red-400

mt-4

text-sm

">

{error}

</p>


}








</div>


)


}