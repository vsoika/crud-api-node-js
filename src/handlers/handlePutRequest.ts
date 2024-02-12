import { IncomingMessage, ServerResponse } from "node:http";
import { UUID } from "node:crypto";
import { validateUserData } from "../utils/validateUserData";
import { TUser } from "../../types";
import { isValidUserId } from "../utils/isValidUserId";

const handlePutRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  USERS_DB: TUser[]
): Promise<TUser[]> => {
  const userId = req.url?.split("/")[3] as UUID;

  let data = "";

  try {
    return new Promise((resolve) => {
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const isValidUserData = validateUserData(JSON.parse(data));
        const user = USERS_DB.find((user) => user.id === userId);

        if (user && (!isValidUserId(userId) || !isValidUserData)) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end(
            JSON.stringify(
              "User ID is not valid UUID value or Request body is not valid. Please, check provided fields and their types."
            )
          );
        } else if (user) {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(`User with id ${userId} has been updated.`);

          const updatedUserData = USERS_DB.map((user) =>
            user.id === userId ? { id: userId, ...JSON.parse(data) } : user
          );

          resolve(updatedUserData);
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end(JSON.stringify("User with requested ID is not found"));
        }
      });
    });
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(JSON.stringify("There is some error on server side."));
  }
};

export default handlePutRequest;
