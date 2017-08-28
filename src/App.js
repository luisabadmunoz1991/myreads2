import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './Listbooks'
import BookSearch from './bookSearch'
import './App.css'

class BooksApp extends Component {
  //Inicializamos los estados
  state = {
    books: []
  }

   componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      
    })
   }

    updateBook = (book, shelf) => {
  book.shelf = shelf;

  this.setState((state) => ({
    books: state.books.filter(b => b.id !== book.id).concat([ book ])
  }))

  BooksAPI.update(book, shelf)
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
                     <ListBooks updateBook={this.updateBook} books={this.state.books.filter(book => book.shelf === 'currentlyReading' )} />                 
                   </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                    <ListBooks updateBook={this.updateBook} books={this.state.books.filter(book => book.shelf === 'wantToRead' )} />
                    </div>
                </div>
              </div>

              <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks updateBook={this.updateBook} books={this.state.books.filter(book => book.shelf === 'read' )} />

                  </div>
             </div>

             <div className="bookshelf">
                 <h2 className="bookshelf-title">None</h2>
                 <div className="bookshelf-books">
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
