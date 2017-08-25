import React , {Component} from 'react'

class Book extends Component{





   render() {

  return (

         <div className="book"> 
                    <div className="book-top">

                        <div className="book-cover" style={{width: 128, height:193, backgroundImage:`url(${this.props.book.imageLinks.thumbnail})`}}>
                         
                         </div>
                              <div className="book-shelf-changer" onSubmit={this.handleSubmit}>

                              <select value={this.props.book.shelf} onChange={this.handleChange}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                    </div>

                    <div className="book-title">
                    {this.props.book.title}

                    </div>
                          <div className="book-authors">
                          {this.props.book.authors}


                          </div>
         </div>
           handleChange = (event) => {
  this.props.updateBook(this.props.book, event.target.value)
}
             )
   } 
}

export default Book