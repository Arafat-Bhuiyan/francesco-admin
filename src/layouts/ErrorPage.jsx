import React from 'react'
import Lottie from 'lottie-react'
import animationData from "../../public/errorPage.json"
import { useNavigate } from 'react-router-dom'
import { IoChevronBackOutline } from "react-icons/io5";


export const ErrorComponent = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gray-50">
            <Lottie
                animationData={animationData}
                loop={true}
                className="w-96 h-96"
            />
            <h1 className="text-3xl font-bold font- mt-6">Something Went Wrong</h1>
            <p className="text-gray-500 mt-2 mb-6">
                An unexpected error occurred. Please try again or go back.
            </p>
            <button
                onClick={() => navigate(-1)}
                className=" px-10 py-3.5 flex items-center justify-center gap-2 bg-gradient-to-r from-[#91A7EF] to-[#5184F6] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all font-semibold"
            >
                <span className='flex items-center gap-2'>
                    <IoChevronBackOutline size={20} />
                    Go Back
                </span>
            </button>
        </div>
    )
}