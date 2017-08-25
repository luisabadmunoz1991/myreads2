import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'





class BookSearch extends Component{
	 static propTypes = {
    books: PropTypes.array.isRequired   
   }
    state = {query:''}

    updateQuery =(query) => {
        this.setState({ query:query.trim()
        })
    }   
     clearQuery =() => {
        this.setState({ query:''
        })
    }

    	render() {
        const{books}= this.props
        const{query} = this.state
        let showingBooks
        if (query){
          const match = new RegExp (escapeRegExp(query), 'i')
          showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors)  )
           } else {
              showingBooks=books
           }
        showingBooks.sort(sortBy('authors'))

		console.log('props', this.props)
	return (

  <div className="search-books">
      <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
              
                <input type="test" placeholder="Search by title or author" value={query} 
                       onChange={(event) => this.updateQuery(event.target.value) }
                />
 
              </div>
            </div>
            
            <div className="search-books-results">
            <ol className='books-grid'> 
            {showingBooks.map((book) =>  
              (
      <li key={book.id}>
          <Book book={book} />
         
               </li>
                 ))}        
              </ol>
            </div>
          </div>
	   )
   } 
}
export default BookSearch