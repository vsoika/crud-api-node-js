import http from "node:http";
import "dotenv/config.js";
import { handleGetRequest } from "./handlers";

const { PORT } = process.env;

const server = http.createServer((request, response) => {
    console.log(request.method)

    if (request.method === 'GET') {
        handleGetRequest(request, response);
    }
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end(`This is CRUD app! ${console.log(process.env.NODE_ENV, process.env.PORT)}`);
});
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.get('/', (req: Request, res: Response) => {
//   res.send({
//     message: 'hello world',
//   });
// });
// app.listen(PORT, () => {
//   console.log('server started at http://localHOST:'+PORT);
// });
