import React,{useState} from "react";
import classes from './HeaderCart.module.css'
import CartIcon from '../assets/cart-icon.jsx'
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const HeaderCart = () =>{
    
    const [animate, setAnimate] = React.useState(0)   

    const totalMeals = useSelector(state => state.cart.totalItems)
    const [quantity,setQuantity] = useState(totalMeals)

    const navigate = useNavigate();

    React.useEffect(()=>{
        return ()=>{setAnimate(1)}
    },[totalMeals]);
    
    function totalItems(arr) {
        let sum=0
        for (let i = 0; i < arr.length; i++){
            sum += +arr[i].quantity
            }
        
        return sum;
    }
            
    
    function cartLoader(){
        navigate('/mycart')
    }




    return(
        <React.Fragment>
            
            <button onClick={cartLoader} className={`${classes.button} ${classes.bump}`} bump={animate} onAnimationEnd={() => setAnimate(0)}>
             <span className={classes.icon}><CartIcon/></span>
             <span>Your Cart</span>
             <span className={classes.badge}><div>{totalMeals}</div></span>
            
            </button>
        </React.Fragment>
    )
}
