import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-center items-center flex-col gap-1 bg-slate-800 text-white w-full bottom-0'>
            <div className="logo font-bold text-2xl text-white">
                <span className='text-green-500'> &lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex gap-1.5'>
                Created with <img className='w-7' src="/icons/heart.png" alt="" /> by Aafridi Khan
            </div>
        </div>
    )
}

export default Footer
