import {FC} from 'react'
import { Wrapper } from "./SearchedItems.styles"
import { CenterContainer } from "./SearchedItems.styles"
import { useQuery } from "react-query";
import axios from 'axios';
import {Paper,Typography,CircularProgress,Grid } from "@mui/material";
import { CartItemType } from "../../App";
import Product from "../../component/product/Product";

 
type Props = {
  product: CartItemType;
  handleAddToCart:(clickedItem:CartItemType) => void;
  searchedItem:string;
  
}



const SearchedItem: FC<Props> = ({searchedItem,handleAddToCart})=> {
  
  const fetchProducts = async () => {
    const { data } = await axios.get(`https://fakestoreapi.com/products?search=${searchedItem}`);
    return data;
  }
  
  const {data,isLoading,error} = useQuery<CartItemType[]>(
    'products',
    fetchProducts,
    {
      staleTime:6000,
    }
    )
  return (
    <Wrapper>
      {!isLoading && !error ? <h3>{searchedItem}</h3> : null}
      {isLoading && error ? (
         <CenterContainer>
         {isLoading && <CircularProgress/>}
         {error ?
           ( <Paper elevation={2} variant='outlined'>
               <Typography variant='body1' color='error'>
                 Failed to fetch data
               </Typography>
             </Paper>
           ): null
         }
       </CenterContainer>
      ) : null
    }
      <Grid container spacing={3}>
        {data?.map(product => (
          <Grid item key={product.id} xs={12} sm={4} >
            <Product product={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))} 
      </Grid>
    </Wrapper>
  )
}

export default SearchedItem
