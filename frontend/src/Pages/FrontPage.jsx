import React from 'react'
import Card from '../Pages/Card.jsx'
import Search from './Search.jsx';

function FrontPage() {
  return (
    <div className="flex min-h-screen p-4 gap-4"> 
      {/* ✅ Left Side */}
      <div className="w-1/2 space-y-4">  
        <Card company={"myntra"} />
        <Card company={"flipkart"} />
      </div>

      <div>

        <Search/>
      </div>

      {/* ✅ Right Side */}
      <div className="w-1/2 space-y-4">  
        <Card company={"ajio"} />
        <Card company={"amazone"} />
      </div>
    </div>
  )
}

export default FrontPage;
