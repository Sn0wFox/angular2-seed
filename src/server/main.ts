import * as Bluebird from "bluebird";
import * as express from "express";
import * as path from "path";

import * as Lib from "../lib/lib-test";

const app: any = express();

console.log(__dirname);

app.use(express.static(path.resolve(__dirname + "/../app")));

app.set('port', process.env.PORT || 3000);

app.get("/api", (req: any, res: any, next: any) => {
  Lib
    .myFunction()
    .then((hello: string) => {
      res.status(200).send(hello);
    })
    .catch((err: Error) => {
      console.log("ERR");
      console.log(err);
    });
});

app.listen(app.get('port'), function() {
  console.log('Express server started at http://localhost:' + app.get('port'));
});