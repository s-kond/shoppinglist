import {nanoid} from "nanoid";
import styled from "styled-components";

export default function SearchResults({filteredItems, handleChooseItem, language}){
    return (
    filteredItems.map(item => <StyledButton onClick={() => {
        /* console.log(item); */
        handleChooseItem(item)}} key={nanoid()}>{language === true ? item.name.de : item.name.en}</StyledButton>)
    )
}

const StyledButton = styled.button`
    background-color: lightblue;
    font-size: 1.3rem;
    border-radius: 10px;
    border: unset;
`