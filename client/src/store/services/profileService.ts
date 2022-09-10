import { client } from "../..";
import { isEmpty } from "../../utils/isEmpty";
import { GraphQLAccessToken } from "../../utils/_graphql";

import {
  GetProfile,
  GetProfileVariables,
} from "../../generated/types/GetProfile";
import {
  UpdateUser,
  UpdateUserVariables,
} from "../../generated/types/UpdateUser";

import { MUTATION_UPDATE_USER } from "../../graphql/mutations/updateUser";
import { QUERY_GET_PROFILE } from "../../graphql/queries/getProfile";

class profileService {
  async getProfile(
    username: GetProfileVariables["username"]
  ): Promise<GetProfile["getProfile"]> {
    try {
      // Send the GraphQL request to the server to get the profile data
      const res = await client.query({
        query: QUERY_GET_PROFILE,
        variables: { username },
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the requested user
      return res.data.getProfile;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error("Error in getProfileService.getProfile: " + err);
    }
  }

  async updateProfile(
    variables: UpdateUserVariables
  ): Promise<UpdateUser["updateUser"]> {
    try {
      // Send the GraphQL updating request to the server
      const res = await client.mutate({
        mutation: MUTATION_UPDATE_USER,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(variables.accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the updated user
      return res.data.updateUser;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error("Error in getProfileService.updateProfile: " + err);
    }
  }
}

export default new profileService();