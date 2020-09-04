import React, { Component } from "react";
import { connect } from "react-redux";
import { booksGet } from "../../store/actions/book_actions";
import { RowGenerator, GenRowsWithB } from "../../utils/helpers";

class Home extends Component {
  
  componentDidMount() {
    this.props.dispatch(booksGet(6, 0, "desc"));
  }

  loadmore=()=>{
    let bookList=this.props.books.collection
    let count =this.props.books.collection.length
    this.props.dispatch(booksGet(2, count, "desc", bookList));

  }

  showArticles = (books) => {
    if (books.collection) {
      const rowsArray = RowGenerator(books.collection, 2);
      const generatedArticles = GenRowsWithB(rowsArray, "six");
      return generatedArticles;
    }
    return false;
  };

  render() {
    return (
      <div className="container">
        <div className="row articles_container">
          {this.showArticles(this.props.books)}
        </div>
        <div 
        onClick={this.loadmore}
        className="loadmore">Load More</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}
export default connect(mapStateToProps)(Home);
