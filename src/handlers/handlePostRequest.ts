import { IncomingMessage, ServerResponse } from "node:http";
import { API_ENDPOINT } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import { validateUserData } from "../utils/validateUserData";
import { TUser } from "../../types";

const handlePostRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  USERS_DB: TUser[]
) => {
  if (req.url === API_ENDPOINT) {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const isValidUserData = validateUserData(JSON.parse(data));

      if (!isValidUserData) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(
          JSON.stringify(
            "Request body is not valid. Please, check provided fields and their types."
          )
        );
      } else {
        USERS_DB.push({ id: uuidv4(), ...JSON.parse(data) });
        res.writeHead(201, { "Content-Type": "text/plain" });
        res.end(JSON.stringify("New user has been added in database."));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(JSON.stringify("Requested URL does not exist."));
  }
};

export default handlePostRequest;
