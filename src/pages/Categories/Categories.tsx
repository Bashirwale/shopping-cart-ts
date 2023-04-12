import {FC} from "react";
import { useQuery } from "react-query";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {Paper,Typography,CircularProgress,Grid } from "@mui/material";
import Product from "../../component/product/Product";
import { Wrapper } from "./Categories.styles";
import { CenterContainer } from "./Categories.styles";
import { CartItemType } from "../../App";


type Props = {
  cartItems:CartItemType[];
  handleAddToCart:(clickedItem:CartItemType) => void;
}



const Categories : FC<Props> = ({cartItems,handleAddToCart}) => {
  const params = useParams();
  console.log(params.categoryName)
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    ['products', params.categoryName],
    async () => {
      const { data } = await axios.get(`https://fakestoreapi.com/products/category/${params.categoryName}`);
      return data;
    },
    {
      staleTime: 6000,
    }
  );
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

export default Categories;
