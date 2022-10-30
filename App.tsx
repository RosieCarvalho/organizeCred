import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import Parse from "parse/react-native.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppProvider } from "./src/hooks";
import { Amplify } from "aws-amplify";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient from "aws-appsync";
import awsconfig from "./src/aws-exports";

const appSyncClient = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: "API_KEY",
    apiKey: awsconfig.aws_appsync_apiKey,
  },
});

export default function App() {
  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize(
    "pEJfIhmdO8ZuQw1fcfUzEfYTkzjgQk0iy4USMM1m",
    "uR0tK7IGNS26PqwsTclfLW7HtZw5OlCoi2kIgqxE"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";

  return (
    <>
      <StatusBar style="auto" />
      <ApolloProvider client={appSyncClient}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ApolloProvider>
    </>
  );
}
