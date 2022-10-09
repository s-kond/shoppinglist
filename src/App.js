import './App.css';
import { useEffect, useState } from 'react';
import { loadLocalStorage, setLocalStorage } from './lib/localStorage';
import styled from "styled-components";
import {search} from "fast-fuzzy";
import SearchResults from './components/SearchResults';
import ActiveItemList from './components/ActiveItems';

function App() {
  const [itemNames, fetchItemNames] = useState(loadLocalStorage("itemNames") ?? []);
  const [activeItemsList, setActiveItems] = useState(loadLocalStorage("shoppinglist") ?? []);
  const [searchInput, setSearchInput] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [recentlyUsed, setRecentlyUsed] = useState([]);
  const [language, setLanguage] = useState(true);

  const itemApiUrl = "https://fetch-me.vercel.app/api/shopping/items"

  useEffect(() => {
    async function fetchResults(){
      const response = await fetch(itemApiUrl);
      const data = await response.json();
      let itemNamesArray = data.data;
      fetchItemNames(itemNamesArray);
    }
    if(itemNames.length === 0){
    fetchResults();
    }
  }, [])

  useEffect(() => {
    setLocalStorage("shoppinglist", activeItemsList);
    setLocalStorage("itemNames", itemNames);
  }, [activeItemsList])

  useEffect(filterItems, [searchInput])

  function filterItems(){
    let result = search(searchInput, itemNames, {keySelector: (obj) => obj.name.de});
    setFilteredList(result);
  }

  function onChooseItem(itemName){
    setActiveItems([...activeItemsList, itemName]);
    setFilteredList(filteredList.filter(item => item.name.de !== itemName.name.de));
    fetchItemNames(itemNames.filter(item => item.name.de !== itemName.name.de));
    setRecentlyUsed(recentlyUsed.filter(item => item.name.de !== itemName.name.de))
  }

  function onDeactivateItems(itemName){
    setActiveItems(activeItemsList.filter(item => item.name.de !== itemName.name.de));
    setFilteredList([itemName, ...filteredList]);
    fetchItemNames([itemName, ...itemNames]);
    setRecentlyUsed([itemName, ...recentlyUsed])
  }

  return (
    <div className="App">
      <HeaderContainer>
      <Heading>{language=== true ? "Einkaufsliste" : "Shopping List"}</Heading>
      <LanguageButton onClick={() => setLanguage(!language)}>{language === true ? <p><strong>DE </strong>| EN</p> : <p>DE | <strong>EN</strong></p>}
      </LanguageButton>
      </HeaderContainer>
      <ItemContainer>
        <ActiveItemList activeItems={activeItemsList} handleDeactivateItems={onDeactivateItems} language={language}/>
      </ItemContainer>
      {/* <Label htmlFor='searchInput'>{language=== true ? "Was möchtest du kaufen?" : "What do you want to buy?"}</Label> */}
      <SearchInput onChange={(event)=> setSearchInput(event.target.value)} 
        name="searchInput" id="searchInput" type="text" placeholder={language === true ? 'Suche' : "Search"} />
      <ItemContainer>
        <SearchResults filteredItems={filteredList} handleChooseItem={onChooseItem} language={language} searchInput={searchInput} recentlyUsed={recentlyUsed}/>
      </ItemContainer>
    </div>
  );
}

export default App;

const Heading = styled.h1`
  margin: 10px 0;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 18%;
  gap: 10px;
  flex-wrap: wrap;

  @media (min-width: 370px){
    flex-wrap: nowrap;
  }
`

const Label = styled.label`
display: block;
width: 63%;
margin: 0 auto;
text-align: left;
`

const LanguageButton = styled.button`
  background-color: transparent;
  border: unset;
  &:hover {
    cursor: pointer;
  }
`

const ItemContainer = styled.div`
  width: 65%;
  margin: 20px auto;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  gap: 5px;

  p {
    padding-left: 7px;
  }
`

const SearchInput = styled.input`
  margin-top: 10px;
  width: 60%;
  font-size: 1.3rem;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
`