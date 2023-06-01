import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,CLEAR_ERRORS} from "../constans/ProductConstans";
import axios from "axios";

export const getProduct= () => async (dispatch)=>{
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        });
  
       let link = `/api/v2/products`;
       
        const {data} = await axios.get(link);
  
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
  }; 
  
//   Clearing errors
export const clearErrors= () => async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
  }