import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function({title,route}){
    const navigate = useNavigate();

    return <Button variant="outlined" onClick={()=>navigate(route)} >{title}</Button>
}