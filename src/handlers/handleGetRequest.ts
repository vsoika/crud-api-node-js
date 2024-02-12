import { IncomingMessage, ServerResponse } from "node:http";
import { API_ENDPOINT } from "../../constants";
import { isValidUserId } from "../utils/isValidUserId";
import { TUser } from "../../types";

const handleGetRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  USERS_DB: TUser[]
) => {
  const userId = req.url?.split("/")[3];

  if (req.url === API_ENDPOINT) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(JSON.stringify(USERS_DB));
  }

  if (userId) {
    const user = USERS_DB.find((user) => user.id === userId);

    if (user && typeof userId !== "string" && !isValidUserId(userId)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(JSON.stringify("User ID is not valid UUID value"));
    }

    if (user) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(JSON.stringify("User with requested ID is not found"));
    }
  }
};

export default handleGetRequest;
