import gql from "graphql-tag";
import {provideApolloClient, useQuery} from "@vue/apollo-composable";
import {computed} from "vue";
import {ApolloClient, InMemoryCache} from "@apollo/client/core";

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
	cache,
	uri: import.meta.env.VITE_BASE_URL + "api-platform/graphql",
});

const DISTRICT_QUERY = gql`
  query {
    districts {
      edges {
        node {
          _id
          name
        }
      }
    }
  }
`;
console.log(apolloClient)
const query = provideApolloClient(apolloClient)(() =>
	useQuery(DISTRICT_QUERY),
);
export const districtList = computed(() => query.result.value?.districts.edges);

const ORG_QUERY = gql`
  query {
    organizations {
      edges {
        node {
          _id
          shortName
          fullName
          district {
            _id
            name
          }
        }
      }
    }
  }
`;

const queryOrg = provideApolloClient(apolloClient)(() =>
	useQuery(ORG_QUERY),
);
export const organizationList = computed(
	() => queryOrg.result.value?.organizations.edges,
);

const ROLES_QUERY = gql`
  query {
    personRoles {
      edges {
        node {
          _id
          name
        }
      }
    }
  }
`;

const queryRoles = provideApolloClient(apolloClient)(() =>
	useQuery(ROLES_QUERY),
);
export const personRoleList = computed(
	() => queryRoles.result.value?.personRoles.edges,
);

//
export default ''//{ districtList, organizationList, personRoleList }