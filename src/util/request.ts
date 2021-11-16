import gql from 'graphql-tag';
/*
* action:getbanner
* 获取轮播图照片
* */
export const uploadProjectMutation = gql`
  mutation uploadProject($input: UploadProjectInput!) {
    uploadProject(input: $input) {
      __typename
      ... on UploadProjectSuccessPayload {
        project {
          id
        }
      }
      ... on ErrorPayload {
        message
      }
    }
  }
`;