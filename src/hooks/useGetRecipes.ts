import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const useGetRecipes = () => {
    useEffect(()=>{
        try{

            const fetchRecipeData = async () => {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes`)
        }
            
        }
    },[])
}