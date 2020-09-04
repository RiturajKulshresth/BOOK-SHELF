import React, { Component } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import AdminLayout from "../../../../HOC/adminLayout";
import { BookSchema, FormElement } from "./utils/postsHelper";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { stateToHTML } from "draft-js-export-html";
import { connect } from "react-redux";
import {
  clearBook,
  getbook,
  editBook,
} from "../../../../store/actions/book_actions";

class AddPosts extends Component {
  state = {
    editorState: "",
    editorContentHtml: "",
    success: false,
    loading: true,
    bookToEdit: {},
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onEditBook = (values) => {
    this.props.dispatch(editBook(values));
  };
  componentDidUpdate(prevProps) {
    const hasChanged = this.props.books.single !== prevProps.books.single;
    const hasUpdated = this.props.books.update !== prevProps.books.update;
    const single = this.props.books.single;

    if (hasUpdated) {
      this.setState({ success: true });
    }
    if (hasChanged) {
      if (single !== false) {
        const blocksFromHtml = htmlToDraft(single.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        this.setState({
          loading: false,
          editorState: EditorState.createWithContent(contentState),
          bookToEdit: {
            _id: single._id,
            name: single.name,
            author: single.author,
            pages: single.pages,
            ratings: single.ratings,
            price: single.price,
          },
        });
      } else {
        this.props.history.push("/");
      }
    }
  }
  componentWillUnmount() {
    this.props.dispatch(clearBook());
  }

  componentDidMount() {
    this.props.dispatch(getbook(this.props.match.params.id));
  }

  render() {
    return this.state.loading ? (
      <> Loading.... </>
    ) : (
      <AdminLayout>
        <h4>Add a Post</h4>

        <Formik
          enableReinitialize={true}
          initialValues={this.state.bookToEdit}
          validationSchema={BookSchema}
          onSubmit={(values, { resetForm }) => {
            this.onEditBook({
              ...values,
              content: stateToHTML(this.state.editorState.getCurrentContent()),
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="_id" value={values._id}></input>

              <FormElement
                elData={{ element: "input", type: "text", value: values.name }}
                placeholder="Title of the Book"
                name="name"
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.name}
                touched={touched.name}
              />

              <Editor
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
              />

              <h4>Book info</h4>
              <FormElement
                elData={{
                  element: "input",
                  type: "text",
                  value: values.author,
                }}
                placeholder="The Author of the Book"
                name="author"
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.author}
                touched={touched.author}
              />
              <FormElement
                elData={{
                  element: "input",
                  type: "number",
                  value: values.pages,
                }}
                placeholder="Number of Pages"
                name="pages"
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.pages}
                touched={touched.pages}
              />
              <FormElement
                elData={{ element: "select", value: values.ratings }}
                name="ratings"
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.ratings}
                touched={touched.ratings}
              >
                <option default>Select a Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </FormElement>
              <FormElement
                elData={{ element: "input", type: "text", value: values.price }}
                placeholder="The Price of the Book"
                name="price"
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.price}
                touched={touched.price}
              />
              <button type="submit">Add Book</button>

              <br />
              {this.state.success ? (
                <div className="succes_entry">
                  <div>Update Complete !!!</div>
                  <Link to={`/article/${this.props.books.update.doc._id}`}>
                    See Your Book
                  </Link>
                </div>
              ) : null}
            </form>
          )}
        </Formik>
      </AdminLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}
export default connect(mapStateToProps)(AddPosts);
