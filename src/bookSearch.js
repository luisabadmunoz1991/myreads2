import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'



class BookSearch extends Component{
	 static propTypes = {
    	books: PropTypes.array.isRequired
   }
	state = {query:'',
   searchResults: [] 
   }
 
  updateQuery = (query) => {
   if (query == "") { this.setState({ searchResults: []}); return; }

  BooksAPI.search(query, 20).then(response => {
    console.log(response);
    console.log("STEP 2")
    console.log("QUERY : " + query)
    console.log("RESPONSE: " + response)
    console.log("SEARCH RESULT: " + this.state.searchResults)

    if (!response || response.error) return;
    console.log("STEP 3")
    console.log("QUERY : " + query)
    console.log("RESPONSE: " + response)
    console.log("SEARCH RESULT: " + this.state.searchResults)
    
    this.setState({ searchResults: response });
    console.log("STEP 4")
    console.log("QUERY : " + query)
    console.log("RESPONSE: " + response)
    console.log("SEARCH RESULT: " + this.state.searchResults)
  })
}
  clearQuery =() => {
        this.setState({ query:''})
    }
    	render() {
        const{query} = this.state
        let showingBooks = this.state.searchResults;
 				if (query){
          const match = new RegExp (escapeRegExp(query), 'i')          
        }

        showingBooks.sort(sortBy('authors'))

			return (
  			<div className="search-books">
      			<div className="search-books-bar">
              	<Link className="close-search" to="/">Close</Link>
              	<div className="search-books-input-wrapper">
                		<input type="test" placeholder="Search by title or author"
                    ref={userInput => this.userInput = userInput}
                    onChange={(event) => this.updateQuery(this.userInput.value) } />
              	</div>
            </div>

            <div className="search-books-results">

							<ol className='books-grid'>
            		{showingBooks.map((book) => (
									<li key={book.id}>
				 						<div className="book">
                    	<div className="book-top">
                        <div className="book-cover" style={{width: 128, height:193, backgroundImage:`url(${(book.imageLinks || {}).thumbnail})`}}></div>
                              <div className="book-shelf-changer">
		                              <select onChange={(event) => {this.props.updateBook(book, event.target.value);}}>
		                                <option value="nona" disabled>Move to...</option>
                                    <option> </option> 
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
              ))}
              </ol>

            </div>
          </div>
	   )
   }
}
export default BookSearch
