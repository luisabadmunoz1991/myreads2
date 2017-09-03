import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class BookSearch extends Component{

constructor(...args){
	super(...args)
	this.state = {query:'',
					libros: []
				  }
}

  updateQuery =(query) => {
        this.setState({ query:query.trim()})
				BooksAPI.search(query).then((bookss) => {
					if(bookss !== undefined){

							BooksAPI.getAll().then((booksTraidos) => {
								this.setState({ booksTraidos });
								booksTraidos.forEach(a => {
									   bookss.forEach(b => {
											 if(a.id === b.id){
												 this.props.updateBook(b, a.shelf)
											 }
										 })
								})
							})

							this.setState({libros:bookss})
				  }else {
				  	this.setState({libros:[]})
				   }
				})
    }

  clearQuery =() => {
        this.setState({ query:''})
    }

    	render() {
        let showingBooks = this.state.libros
				console.log(this.state.query)
				if (this.state.query !== ""){
	          const match = new RegExp(escapeRegExp(this.state.query), 'i')
	          showingBooks = this.state.libros.filter( (book) => match.test(book.title) || match.test(book.authors) )
						showingBooks.sort(sortBy('authors'))
        } else {
          showingBooks = []
					console.log(showingBooks)
        }

			return (
  			<div className="search-books">
      			<div className="search-books-bar">
              	<Link className="close-search" to="/">Close</Link>
              	<div className="search-books-input-wrapper">
                		<input type="test" placeholder="Search by title or author" value={this.state.query}
                       onChange={(event) => this.updateQuery(event.target.value) } />
              	</div>
            </div>

            <div className="search-books-results">

							<ol className='books-grid'>
            		{showingBooks !== [] ? showingBooks.map((book) => (
									<li key={book.id}>
				 						<div className="book">
                    	<div className="book-top">
                        <div className="book-cover" style={{width: 128, height:193, backgroundImage:`url(${(book.imageLinks || {}).thumbnail})`}}></div>
                              <div className="book-shelf-changer">
		                              <select onChange={(event) => {this.props.updateBook(book, event.target.value);}}>
		                                <option value="nona" disabled>Move to...</option>
																		<option style={{color: `#0f0`}}>state: {book.shelf}</option>
																		<option value="currentlyReading">Currently Reading</option>
		                                <option value="wantToRead">Want to Read</option>
		                                <option value="read">Read</option>
		                                <option value="none">None</option>
		                              </select>
                               </div>
                    	</div>

                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              )) : '<div></div>'}
              </ol>

            </div>
          </div>
	   )
   }
}
export default BookSearch
