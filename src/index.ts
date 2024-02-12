import http from "node:http";
import "dotenv/config.js";
import {
  handleDeleteRequest,
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
} from "./handlers";
import { API_ENDPOINT } from "../constants";
import { TUser } from "../types";

const { PORT } = process.env;

let USERS_DB: TUser[] = [];

const server = http.createServer(async (request, response) => {
  const urlSplittedLength = request.url.split("/").length;

  try {
    if (
      !request.url.includes(API_ENDPOINT) ||
      !(urlSplittedLength === 3 || urlSplittedLength === 4)
    ) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end(JSON.stringify("Requested URL does not exist."));
    }

    if (request.method === "GET") {
      handleGetRequest(request, response, USERS_DB);
    }

    if (request.method === "POST") {
      handlePostRequest(request, response, USERS_DB);
    }

    if (request.method === "PUT") {
      const updatedUserData = await handlePutRequest(
        request,
        response,
        USERS_DB
      );
      USERS_DB = updatedUserData;
    }

    if (request.method === "DELETE") {
      const updatedUserData = handleDeleteRequest(request, response, USERS_DB);
      USERS_DB = updatedUserData;
    }
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end(JSON.stringify("There is some error on server side."));
  }
});
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
