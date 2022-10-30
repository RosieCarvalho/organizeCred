import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

//Declare you GraphQL documents below
export const CreateCard = gql`mutation CreateCard($title: String!) {
	createCard(title: $title) {
        id
        title
    }
}`

export const FetchPosts = gql`query FetchPosts {
    listCard {
        id
        title
    }  
}`

//Declare your React Component level operations below
export const operations = {
  CreatePost: graphql(CreatePost, {
    options: {
      refetchQueries: [ { query: FetchPosts } ]
    },
    props: props => ({
      createPost: (post) => {
        return props.mutate({
          variables: post,
          
          optimisticResponse: {
            putPost: {...post,__typename: 'Card'}
          }
        })
      }
    })
  }),

  FetchPosts: graphql(FetchPosts, {
      options: {
        fetchPolicy: 'network-only'
      },
      props: ({data}) => {
          return {
              loading: data.loading,
              posts: data.allPost
          }
      }
  })

}