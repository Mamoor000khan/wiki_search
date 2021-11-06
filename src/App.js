import { useState} from "react";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({})
  //This is a test code
  const handleSearch = async (e) => {
    e.preventDefault();
    if(search === '') return;

    const response  = await fetch  (`http://en.wikipedia.org/w/api.php?action=query&list=search&
    prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`);

    
    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json();
    
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  }
   
   return (
    <div className="App">
      <header>
        <h1>wiki Search</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input 
             type="search" 
             placeholder="What Are You Looking For?"
             value={search}
             onChange={e => setSearch(e.target.value)}
             />
        </form>
        { (searchInfo.totalhits) ? <p>Search Results: {searchInfo.totalhits}</p> : ''}
      </header>
       <div className="results">
         {results.map((result, i) => {
           const url = `http://en.wikipedia.org/?curid=${result.pageid}`
                return(
                <div className="result" key={i}>
                <h3>{ result.title}</h3>
                <p dangerouslySetInnerHTML={{__html: result.snippet}}></p>
                 <a href={url} target="_blank" rel="noreferrer">Read More</a>
              </div>
                )
         })}
         
       </div>
    </div>
  );
}

export default App;
