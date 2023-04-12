import {FC, useState} from 'react'
import {
  Toolbar,
  InputBase,
  MenuItem,
  Typography,
  Badge,
  Drawer
} from '@mui/material';
import { AddShoppingCart } from "@mui/icons-material";
import { StyledButton } from './NavMenu.styles';
import { StyledLink } from './NavMenu.styles';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { StyledAppBar,LogoWrapper,SearchWrapper,SearchIconWrapper,CategoriesButton,StyledMenu } from './NavMenu.styles';
import Cart from '../Cart/Cart'
import { CartItemType } from '../../App';
import { useNavigate } from 'react-router-dom';

type Props = {
  handleAddToCart:(clickedItem:CartItemType) => void;
  cartItems:CartItemType[];
  handleRemoveFromCart:(id:number)=> void;
  getTotalItems:(items: CartItemType[])=> number;
  onSearch: (searchItem: string) => void;
}

const NavMenu : FC<Props> = ({cartItems,handleAddToCart,handleRemoveFromCart,getTotalItems,onSearch}) => {
  const [cartOpen,setCartOPen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate  = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSearch  = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate(`/search/${searchTerm}`);
  }

  console.log(searchTerm);
  return (
    <StyledAppBar position="static">
       <Drawer anchor="right" open={cartOpen} onClose= {() => setCartOPen(false)}>
        <Cart
         cartItems={cartItems}
         addToCart={handleAddToCart}
         removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
       <StyledButton onClick={() => setCartOPen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart/>
        </Badge>
      </StyledButton>
      <Toolbar>
        <LogoWrapper>
          <Typography variant="h3" component="div">
           <StyledLink to='/'>
            B-S(Stores)
           </StyledLink>
          </Typography>
        </LogoWrapper>
        <SearchWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <form onSubmit={handleSearch}>
            <InputBase placeholder="Search…" onChange={(e)=>setSearchTerm(e.target.value)} inputProps={{ 'aria-label': 'search' }} />
          </form>
        </SearchWrapper>
        <CategoriesButton onClick={handleMenuOpen}>Categories</CategoriesButton>
        <StyledMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <StyledLink to='/category/electronics'>
            <MenuItem onClick={handleMenuClose}>Electronics</MenuItem>
          </StyledLink>
          <StyledLink to='/category/jewelery'>
            <MenuItem onClick={handleMenuClose}>Jeweleries</MenuItem>
          </StyledLink>
          <StyledLink to={`/category/men's%20clothing`}>
            <MenuItem onClick={handleMenuClose}>Men's Clothing</MenuItem>
          </StyledLink>
          <StyledLink to={`/category/women's clothing`}>
            <MenuItem onClick={handleMenuClose}>Women's Clothing</MenuItem>
          </StyledLink>
        </StyledMenu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavMenu