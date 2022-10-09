import styled from "styled-components"
import { nanoid } from "nanoid"

export default function FruitList({fruitArray, handleDeactivateItems, language}) {
if (fruitArray.length > 0){
    return (
        <Details open>
            <summary>Fruits & Vegetables</summary>
            <section>{fruitArray.map(item => <StyledButton onClick={() => handleDeactivateItems(item)} key={nanoid()}
            >{language === true ? item.name.de : item.name.en}</StyledButton>)}</section>
        </Details>
    )
}
}

const StyledButton = styled.button`
    background-color: lightblue;
    font-size: 1.3rem;
    border-radius: 10px;
    border: unset;
    margin: 0 5px;

    &:hover {
        cursor: pointer;
    }`

const Details = styled.details`
    text-align: left;

    section {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding-top: 10px;
    }
`