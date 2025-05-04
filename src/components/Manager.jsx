import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
      
    }
    

    useEffect(() => {
        getPasswords()
    }, [])


    const showPassword = (e) => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes('icons/eyecross.png')) {
            ref.current.src = 'icons/eye.png'
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = 'icons/eyecross.png'
        }
    }

    const savePassword = async () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){

            //if any such id exist in the db, delete it
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ id: form.id}) })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...form, id: uuidv4() }) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])

            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 1999,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Error! Password not saved!')
        }

    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => (item.id !== id)))
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ id }) })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => (item.id !== id))))
        }
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 1999,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    const editPassword = (id) => {
        console.log("Editing password with id ", id)
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 1999,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1999}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="absolute top-0 -z-10 h-full w-full bg-green-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div> </div>
            <div className="mycontainer p-3 md:mycontainer min-h-[85.7vh]">
                <h1 className="font-bold text-4xl text-center ">
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-gray-900 text-lg text-center'>Your own Password Manager</p>

                <div className='flex flex-col p-4 gap-8 items-center'>

                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full  border border-green-700 px-3 py-1 text-black w-full' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full  border border-green-700 px-3 py-1 text-black w-full' type="text" name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full  border border-green-700 px-3 py-1 text-black w-full' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={26} className='p-1' src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 rounded-full px-6 gap-4 py-2 w-fit hover:bg-green-400 border border-green-900 '><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>Save</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-5'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-fixed w-full  rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className="w-1/2 px-4 py-2">Title</th>
                                <th className="w-1/4 px-4 py-2">Author</th>
                                <th className="w-1/4 px-4 py-2">Views</th>
                                <th className="w-1/4 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className="border border-white px-4 py-2 text-center gap-1">
                                        <div className='flex justify-center items-center'>
                                            <span><a href="/" target='_blank'>{item.site} </a></span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "2px" }}
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-white px-4 py-2 text-center">
                                        <div className='flex justify-center items-center'>
                                            <span>{item.username}</span>
                                            <div className='size-7 cursor-pointer'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "2px" }}
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-white px-4 py-2 text-center">
                                        <div className='flex justify-center items-center'>
                                            <span>{item.password}</span>
                                            <div className='size-7 cursor-pointer'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "2px" }}
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="flex justify-center items-center py-2 border border-white text-center">
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
