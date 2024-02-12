import { IncomingMessage, ServerResponse } from "node:http";
import { TUser } from "../../types";
import { UUID } from "node:crypto";
import { isValidUserId } from "../utils/isValidUserId";

const handleDeleteRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  USERS_DB: TUser[]
): TUser[] => {
  const userId = req.url?.split("/")[3] as UUID;
  const user = USERS_DB.find((user) => user.id === userId);

  if (user && !isValidUserId(userId)) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(
      JSON.stringify(
        "User ID is not valid UUID value or Request body is not valid. Please, check provided fields and their types."
      )
    );
  }

  if (user) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(
      `User with id ${userId} has been successfully deleted from the database.`
    );

    return USERS_DB.filter((user) => user.id !== userId);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(JSON.stringify("User with requested ID is not found"));
  }
};

export default handleDeleteRequest;
