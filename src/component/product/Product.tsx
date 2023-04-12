import { Button } from "@mui/material"
import { CartItemType } from "../../App"
import { Wrapper } from "./product.styles"
import {FC} from 'react'

 
type Props = {
  product: CartItemType;
  handleAddToCart:(clickedItem:CartItemType) => void;
  
}

const Product: FC<Props> = ({product,handleAddToCart})=> {
  return (
    <Wrapper>
      <img src={product.image} alt={product.title} />
      <div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
      </div>
      <Button onClick={()=> handleAddToCart(product)}>Add to Cart</Button>
    </Wrapper>
  )
}

export default Product
