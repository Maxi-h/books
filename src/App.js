import { useState, useEffect, useContext, createContext } from 'react';
import './App.css';
import axios from 'axios';

const Context = createContext({});

function ContextProvider({ children }) {
  const [contextProvider, setContextProvider] = useState({text: "java"})

  return <Context.Provider value={{contextProvider, setContextProvider}}>
    {children}
  </Context.Provider>
}


function Content() {
  const [data, setData] = useState(null);
  const { contextProvider, setContextProvider } = useContext(Context)

  useEffect(() => {

    async function searchBook() {
      const response = await axios(`https://hn.algolia.com/api/v1/search?query=${contextProvider.text}`)
      setData(response.data)
    }
    searchBook()

  }, [contextProvider])


  return (

    <div className="App">
      <h1>Libros</h1>
      <input type="text" value={contextProvider.text} onChange={e => {
        setContextProvider({text: e.target.value} )
      }}></input>
      <ul>
        {data && data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>

  );
}


function App() {

  return (
    <ContextProvider>
      <Content />
    </ContextProvider>
  );
}

export default App;