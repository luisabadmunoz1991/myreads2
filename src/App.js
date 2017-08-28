import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './Listbooks'
import BookSearch from './bookSearch'
import './App.css'

class BooksApp extends Component {
  //Inicializamos los estados
  state = {
    books: [],
    wantToRead:[],
    currentlyReading:[],
    read:[],
    none:[]
  }

   componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      this.setState({ wantToRead: books.filter( (c) => c.shelf === "wantToRead" ) });
      this.setState({ currentlyReading: books.filter( (c) => c.shelf === "currentlyReading" ) });
      this.setState({ read: books.filter( (c) => c.shelf === "read" ) });
      this.setState({ none: books.filter( (c) => c.shelf === "none" ) });
    })
   }

     updateBook = (book) => {
      this.setState((state) => ({
        books: state.books.filter((c) => c.shelf !== book.shelf)
      }))
      BooksAPI.update(book)
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
                      <ListBooks books={this.state.wantToRead} />
                    </div>
                </div>
              </div>

              <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.read} />
                  </div>
             </div>

             <div className="bookshelf">
                 <h2 className="bookshelf-title">None</h2>
                 <div className="bookshelf-books">
                   <ListBooks books={this.state.none} />
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
           updateBook={this.shelf}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
