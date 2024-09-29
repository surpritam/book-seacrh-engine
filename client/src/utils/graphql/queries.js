// src/graphql/queries.js
import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;