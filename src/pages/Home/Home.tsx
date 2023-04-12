import {FC} from 'react'
import { useQuery } from "react-query";
import axios from 'axios';
import { Link } from "react-router-dom";
import {Paper,Typography,CircularProgress,Grid,Button} from "@mui/material";
import { CartItemType } from "../../App";
import { Wrapper, } from "./Home.styles";
import { CenterContainer } from './Home.styles';
import Product from "../../component/product/Product";

type Props = {
  cartItems:CartItemType[];
  handleAddToCart:(clickedItem:CartItemType) => void;
}

const fetchProducts = async () => {
  const { data } = await axios.get('https://fakestoreapi.com/products?limit=5');
  return data;
}


const Home : FC<Props> = ({cartItems,handleAddToCart}) => { 
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
        <Grid item key={product.id} xs={12} sm={4} md={4} lg={3}>
          <Product product={product} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid> 
    <Button component={Link} to="/products" variant="contained" color="primary">
        View All Products
    </Button>
  </Wrapper>
)
}

export default Home
