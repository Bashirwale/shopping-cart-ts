import {FC, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavMenu from './component/NavMenu/NavMenu';
import Categories from './pages/Categories/Categories';
import Home from './pages/Home/Home';
import Products from "./pages/products/Products";
import SearchedItem from './component/Searched.Item/SearchedItem'



export type  CartItemType = {
  id:number;
  category: string;
  description:string;
  image:string;
  price:number;
  title: string;
  amount: number;
}

const App : FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [searchItem,setSearchItem] = useState<string>('')
  

  const handleAddToCart = (clickedItem:CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if(isItemInCart){
        return prev.map(item => (
          item.id === clickedItem.id 
          ? {...item,amount:item.amount + 1}
          : item
        ));
      }
      return [...prev, {...clickedItem,amount:1}]
    })
   };
   
   const handleRemoveFromCart = (id:number) => {
    setCartItems(prev => (
      prev.reduce((ack,item) => {
        if(item.id === id){
          if(item.amount === 1) return ack;
          return [...ack,{...item,amount:item.amount-1}];
        }else{
          return[...ack,item];
        }
      }, [] as CartItemType[]
      )
    ))
   };
  
   const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack :number, items) => ack + items.amount, 0)
    ;
    const handleSearch = (item: string) => {
      setSearchItem(item);
      console.log(item);
    };
  return (
    <Router>
      <
        NavMenu
        cartItems={cartItems}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        getTotalItems ={getTotalItems}
        onSearch={handleSearch}
      />
        <Routes>
          <Route path='/' element={<
              Home
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
            />}
          />
          <Route path='/search/:searchedItem' element={
            <
              SearchedItem
      
            searchedItem={searchItem}
            handleAddToCart={handleAddToCart}
            product={{
              id: 0,
              category: '',
              description: '',
              image: '',
              price: 0,
              title: '',
              amount: 0
            }} />
          }
          />
          <Route path='/category/:categoryName' element={<
              Categories
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
            />}
          />
          <Route path='/products' element={<
              Products
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
            />}
          />
        </Routes>
        
    </Router>
      
  )
}

export default App;
