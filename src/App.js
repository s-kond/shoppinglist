import './App.css';
import { useEffect, useState } from 'react';
import { loadLocalStorage, setLocalStorage } from './lib/localStorage';
import styled from "styled-components";
import {search} from "fast-fuzzy";
import SearchResults from './components/SearchResults';
import ActiveItemList from './components/ActiveItems';

function App() {
  const [itemNames, fetchItemNames] = useState([]);
  const [activeItemsList, setActiveItems] = useState(loadLocalStorage("shoppinglist") ?? []);
  const [searchInput, setSearchInput] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const itemApiUrl = "https://fetch-me.vercel.app/api/shopping/items"

  useEffect(() => {
    async function fetchResults(){
      const response = await fetch(itemApiUrl);
      const data = await response.json();
      let itemNamesArray = data.data;
      fetchItemNames(itemNamesArray);
    }
    fetchResults();
  }, [])

  useEffect(() => {
    setLocalStorage("shoppinglist", activeItemsList);
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
  }

  function onDeactivateItems(itemName){
    setActiveItems(activeItemsList.filter(item => item.name.de !== itemName.name.de));
    setFilteredList([itemName, ...filteredList]);
    fetchItemNames([itemName, ...itemNames]);
  }

  return (
    <div className="App">
      <h1>Einkaufsliste</h1>
      <div>
        <ActiveItemList activeItems={activeItemsList} handleDeactivateItems={onDeactivateItems}/>
      </div>
      <SearchInput onChange={(event)=> setSearchInput(event.target.value)} 
        name="searchInput" type="text" placeholder='Suche'/>
      <SearchContainer>
        <SearchResults filteredItems={filteredList} handleChooseItem={onChooseItem} />
      </SearchContainer>
    </div>
  );
}

export default App;

const SearchContainer = styled.div`
  width: 50%;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
`

const SearchInput = styled.input`
  margin-top: 20px;
  width: 50%;
  font-size: 1.3rem;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
`