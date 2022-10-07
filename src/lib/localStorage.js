export function setLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

export function loadLocalStorage(key){
    try {
    return JSON.parse(localStorage.getItem(key))
    } catch (error){
        console.log(error.message);
    }
}