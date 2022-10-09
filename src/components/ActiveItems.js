import {nanoid} from "nanoid";
import { useState } from "react";
import styled from "styled-components";
import FruitList from "./FruitList";
import BreadList from "./BreadList";

export default function ActiveItemList({activeItems, handleDeactivateItems, language, breadArray, fruitArray}){
    return (
        <ListContainer>
        <FruitList fruitArray={fruitArray} language={language} handleDeactivateItems={handleDeactivateItems}/>
        <BreadList breadArray={breadArray} language={language} handleDeactivateItems={handleDeactivateItems}/>
        </ListContainer>
    )        
}

const ListContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 20px;
`
/* 
const StyledButton = styled.button`
    background-color: lightblue;
    font-size: 1.3rem;
    border-radius: 10px;
    border: unset;
    margin: 0 5px;

    &:hover {
        cursor: pointer;
    }
` */