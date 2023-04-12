import styled from 'styled-components';
import { AppBar,Menu,Button,IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledAppBar = styled(AppBar)`
  background-color: #fff!important;
  color: hsl(26, 100%, 55%)!important;
  position:fixed!important;
  top:0;
  left:0;
  padding:10px 30px;
  width:100%;
  z-index:1000;
`;

export const StyledLink = styled(Link)`
  color: hsl(26, 100%, 55%);
  font-size:16px;
  text-decoration: none;
  &:hover{
    border-bottom:1px solid #ccc;
  }
`;
export const StyledButton = styled(IconButton)`
  position:fixed !important;
  z-index:100!important;
  right:14px!important;
  top:26px!important;
  color:hsl(26, 100%, 55%)!important;
`
export const LogoWrapper = styled.div`
  flex-grow: 1!important;
`;

export const SearchWrapper = styled.div`
  position: relative!important;
  border-radius: 4px!important;
  background-color: rgba(0, 0, 0, 0.1)!important;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2)!important;
  }
  margin-right: 20px;
  margin-left: 20px;
  width: auto;
`;

export const SearchIconWrapper = styled.div`
  padding: 10px!important;
  height: 100%!important;
  position: absolute!important;
  left:-50!important;
  top:0!important;
  pointer-events: none;
  display: flex!important;
  justify-content: center!important;
  align-items: center!important;
`;

export const CategoriesButton = styled(Button)`
  text-transform: none;
  color:hsl(26, 100%, 55%)!important ;
`;

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    border-radius: 4px;
  }
`;