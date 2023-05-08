import {useQuery, gql} from '@apollo/client'

const GET_ARTICLES_BY_AUTHOR = gql`
{
  approvals(first: 5) {
    id
    owner
    approved
    tokenId
  }
  approvalForAlls(first: 5) {
    id
    owner
    operator
    approved
  }
}
`

export default function graphExamp() {
    const {loading, error, data} = useQuery(GET_ARTICLES_BY_AUTHOR)
    console.log(data)
    return <div>Hi!</div>
}

// https://youtu.be/gyMwXuJrbJQ?t=103064