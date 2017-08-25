import React , {Component} from 'react'

class Book extends Component{
  constructor(props) {
    super(props);
    this.state = this.props.book.shelf;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(event) {
    this.setState(this.props.book.shelf = event.target.shelf);

  }


   render() {

  return (

         <div className="book"> 
                    <div className="book-top">

                        <div className="book-cover" style={{width: 128, height:193, backgroundImage:`url(${this.props.book.imageLinks.thumbnail})`}}>
                         
                         </div>
                              <div className="book-shelf-changer" onSubmit={this.handleSubmit}>

                              <select value={this.state.shelf} onChange={this.handleChange}>
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
             )
   } 
}

export default Book