import { useQuery } from "react-query";
import axios from 'axios';
import {Paper,Typography,CircularProgress,Grid } from "@mui/material";
import { CartItemType } from "../../App";
import { Wrapper, } from "./app.styles";
import { CenterContainer } from "./app.styles";
import Product from "../../component/product/Product";
import {FC} from 'react'

type Props = {
  cartItems:CartItemType[];
  handleAddToCart:(clickedItem:CartItemType) => void;
}

const fetchProducts = async () => {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return data;
}


const Products: FC<Props> = ({cartItems,handleAddToCart})=> {
  
  
  const {data,isLoading,error} = useQuery<CartItemType[]>(
    'products',
    fetchProducts,
    {
      staleTime:6000,
    }
    );
console.log(data);
 
  return (
    <Wrapper>
      <Grid container spacing={3}>
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
        {data?.map(product => (
          <Grid item key={product.id} xs={12} sm={4} >
            <Product product={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))} 
      </Grid>
    </Wrapper>
  )
}

export default Products;
