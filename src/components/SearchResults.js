import {nanoid} from "nanoid";
import styled from "styled-components";

export default function SearchResults({filteredItems, handleChooseItem, language, searchInput, recentlyUsed}){
    if(searchInput === ""){
        return (
        <Collapse>
            <summary>{language === true ? "Zuletzt gekauft" : "Recently used"}</summary>
            <RecentContainer>{recentlyUsed.map(item => <StyledButton onClick={() => {
        handleChooseItem(item)}} key={nanoid()} style={{backgroundColor: "orange"}}>{language === true ? item.name.de : item.name.en}</StyledButton>)}</RecentContainer>
        </Collapse>
        )
    } else if (filteredItems.length === 0){
        return <p>{language === true ? "Leider keine Treffer..." : "Sorry, we couldn't find anything..."}</p>
    } else {
    return (filteredItems.map(item => <StyledButton onClick={() => {
        handleChooseItem(item)}} key={nanoid()}>{language === true ? item.name.de : item.name.en}</StyledButton>)
    )}

}

const StyledButton = styled.button`
    background-color: lightblue;
    font-size: 1.3rem;
    border-radius: 10px;
    border: unset;

    &:hover {
        cursor: pointer;
    }
`

const Collapse = styled.details`
    text-align: left;
`
const RecentContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding-top: 10px;
`