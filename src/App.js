import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './Listbooks'
import BookSearch from './bookSearch'
import './App.css'

class BooksApp extends React.Component {

  state = {

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    wantToRead:[],
    currentlyReading:[],
    read:[]

  }
   componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      this.setState({ wantToRead: books.filter((c) => c.shelf === "wantToRead" ) });
      this.setState({ currentlyReading: books.filter((c) => c.shelf === "currentlyReading" ) });
      this.setState({ read: books.filter((c) => c.shelf === "read" ) });
    })
   }

     updateBook = (book, shelf) => {
      this.setState((state) => ({
        books: state.books.filter((c) => c.shelf !== book.shelf)
      }))
      BooksAPI.update(book, shelf)}

        handleChange = (event) => {
  this.props.updateBook(this.props.book, event.target.value)
}

  render() {
    return (
   <div className="app">

      <Route exact path="/" render={() => (

        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.currentlyReading} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.wantToRead}/></div> 
                
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.read} />
                
                  </div>
                </div>
              </div>
          
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>

        </div>

    )}/>
      
      <Route path="/search" render={({ history }) => (
        <BookSearch
           books={this.state.books}
           updateBook={this.updateBook}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
