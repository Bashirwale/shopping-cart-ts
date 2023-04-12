import styled from "styled-components"
export const Wrapper = styled.div`
  margin:80px 40px;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* aligns the child elements vertically */
  height: 100%; /* sets the height of the parent element to 100% */
  
  & > .MuiButton-root {
    align-self: center; /* aligns the button horizontally */
    margin-top: 140px; /* adds some space between the button and the products */
    background-color:hsl(26, 100%, 55%);
  }
`;
export const CenterContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  margin:0 auto;
`;
