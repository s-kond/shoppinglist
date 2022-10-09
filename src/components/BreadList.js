import styled from "styled-components"
import { nanoid } from "nanoid"

export default function BreadList({breadArray, handleDeactivateItems, language}) {
    if (breadArray.length > 0){
        return (
            <Details open>
                <summary>Bread & Pastries</summary>
                <section>{breadArray.map(item => <StyledButton onClick={() => handleDeactivateItems(item)} key={nanoid()}
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