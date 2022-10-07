import {nanoid} from "nanoid";
import styled from "styled-components"

export default function ActiveItemList({activeItems, handleDeactivateItems}){
    return (
    activeItems.map(item => <StyledButton onClick={() => handleDeactivateItems(item)} key={nanoid()}>{item.name.de}</StyledButton>)
    )
}

const StyledButton = styled.button`
    background-color: lightblue;
    font-size: 1.3rem;
    border-radius: 10px;
    border: unset;
    margin: 0 5px;
`