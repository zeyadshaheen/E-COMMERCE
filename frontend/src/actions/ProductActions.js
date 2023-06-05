import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS} from "../constans/ProductConstans";
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
  

// Get All Products Details
export const getProductDetails= (id) => async (dispatch)=>{
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
    
        const { data } = await axios.get(`/api/v2/product/${id}`);
    
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data.product,
        });
      } catch (error) {
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response.message,
        });
      }
    };
  

//   Clearing errors
export const clearErrors= () => async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
  }