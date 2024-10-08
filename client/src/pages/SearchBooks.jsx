import React, { useState } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  Spinner,
  Alert
} from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_BOOK_MUTATION } from '../utils/graphql/mutations';
import { ME_QUERY } from '../utils/graphql/queries';
import { searchGoogleBooks } from '../utils/API';
import Auth from '../utils/auth';

const SearchBooks = () => {
  // State for holding returned Google API data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // State for holding search field data
  const [searchInput, setSearchInput] = useState('');
  // State for managing alerts
  const [showAlert, setShowAlert] = useState(false);

  // Fetch current user's saved books using ME_QUERY
  const { data: userData, loading: userLoading, error: userError, refetch: refetchUser } = useQuery(ME_QUERY, {
    skip: !Auth.loggedIn(), // Skip the query if user is not logged in
    fetchPolicy: 'cache-and-network', // Ensure data is fresh
  });

  // Define the SAVE_BOOK_MUTATION
  const [saveBook, { error: saveError }] = useMutation(SAVE_BOOK_MUTATION, {
    onCompleted: () => {
      // Refetch user data to update saved books
      refetchUser();
      // Optionally, show a success alert
      setShowAlert(true);
    },
    onError: () => {
      // Show error alert if mutation fails
      setShowAlert(true);
    },
  });

  // Handler for form submission to search books
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.previewLink || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  // Handler for saving a book
  const handleSaveBook = async (bookId) => {
    // Find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // Get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveBook({
        variables: { book: bookToSave },
      });
    } catch (err) {
      console.error(err);
      // Error handling is managed in onError
    }
  };

  // Determine saved books to disable the save button
  const savedBooks = userData?.me?.savedBooks || [];

  // Handle loading and error states for user data
  if (userLoading) return <Spinner animation="border" />;
  if (userError) return <Alert variant="danger">Error loading saved books.</Alert>;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                  required
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Operation completed successfully!
          </Alert>
        )}
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            const isBookSaved = savedBooks.some((savedBook) => savedBook.bookId === book.bookId);

            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors.join(', ')}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={isBookSaved}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}
                      >
                        {isBookSaved ? 'This book has already been saved!' : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;