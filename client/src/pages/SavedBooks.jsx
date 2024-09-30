import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { ME_QUERY } from '../utils/graphql/queries';
import { REMOVE_BOOK_MUTATION } from '../utils/graphql/mutations';
import Auth from '../utils/auth';

const SavedBooks = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  // Fetch saved books via GraphQL
  const { loading, error, data, refetch } = useQuery(ME_QUERY, {
    skip: !token, // Skip the query if there's no token
    fetchPolicy: 'network-only', // Always fetch from server to get the latest data
  });

  // Define the REMOVE_BOOK_MUTATION
  const [removeBook, { error: removeError }] = useMutation(REMOVE_BOOK_MUTATION, {
    onCompleted: () => refetch(), // Refetch data after mutation completes
  });

  // Handle loading and error states
  if (loading) return <h2>LOADING...</h2>;
  if (error) return <p>Error fetching user data.</p>;
  if (removeError) return <p>Error removing the book.</p>;

  const userData = data?.me;

  // Handler to delete a book
  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
      });
      // Optionally, show a success message or notification
    } catch (err) {
      console.error('Error removing book:', err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;