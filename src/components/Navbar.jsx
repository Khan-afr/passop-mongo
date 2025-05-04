import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-slate-800 text-white'>
    <div className="mycontainer flex justify-between px-4  py-4 items-center gap-4 h-14">

    <div className="logo font-bold text-2xl ">
        <span className='text-green-500'> &lt;</span>
        Pass
        <span className='text-green-500'>OP/&gt;</span>
        </div>
    {/* <ul className='flex gap-4 '>
       <a className='hover:font-bold' href="/"> <li>Home</li></a>
       <a className='hover:font-bold' href="/about"> <li>About</li></a>
       <a className='hover:font-bold' href="/contact"> <li>Contact Us</li></a>
    </ul> */}
    <button className='text-white bg-green-500 rounded-full flex  justify-between items-center ring-white ring-1'>
      <img className='w-10 invert p-1' src="/icons/github.png"  alt="github logo" />
      <span className='font-bold px-1'>GitHub</span>
    </button>
    </div>
    
   </nav>
  )
}

export default Navbar
