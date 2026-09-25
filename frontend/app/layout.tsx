import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {

title:"NeuroScan AI",

description:"Brain Tumor Detection AI Dashboard"

};



export default function RootLayout({

children,

}:Readonly<{

children:React.ReactNode

}>) {


return (

<html lang="en">

<body>

{children}

</body>

</html>

)

}