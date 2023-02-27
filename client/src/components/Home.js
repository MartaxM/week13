import {useState } from 'react';

function Home() {

  const [book, setBook]=useState({
    name:"",
    author:"",
    pages:""
  });

  function handleNameChange(e) {
    setBook({
      ...book,
      name: e.target.value
    });
  }

  function handleAuthorChange(e) {
    setBook({
      ...book,
      author: e.target.value
    });
  }
  function handlePagesChange(e) {
    setBook({
      ...book,
      pages: e.target.value
    });
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name: book.name,
        author: book.author,
        pages: book.pages
      }),
      mode: "cors"
    }
    fetch('/api/book',requestOptions)
      .then(response=>response.json)
  }

  return (
    
    <div>
      <h1>books</h1>
      <form onSubmit={onSubmit}>
        <input id = "name" type="string" value={book.name} onChange={handleNameChange} placeholder="name"></input>
        <input id = "author" type="string" value={book.author} onChange={handleAuthorChange} placeholder="author"></input>
        <input id = "pages" type="number" value={book.pages} onChange={handlePagesChange} placeholder="pages"></input>
        <input type="submit" id = "submit"></input>
      </form>
      
    </div>
  );
}

export default Home;
