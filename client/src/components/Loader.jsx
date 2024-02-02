import React from 'react'
import { useState, } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  return (
    <div style={{marginTop:"150px", display:'flex',justifyContent:"center", alignItems:"center"}}>
    <div className="sweet-loading text-center ">
      <HashLoader
        color='#000'
        loading={loading}
        size={80}
        css =''
      />
    </div>
    </div>
  )
}

export default Loader
