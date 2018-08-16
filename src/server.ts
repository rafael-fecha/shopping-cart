/*
 * Modules
 *
 * body-parser - parse JSON payload data into the req.body object that will be available in our express application
 * cookie-parser - similar to the body-parser in that it parses the user’s cookie data and makes this available in the req.cookies object
 * express - express framework
 * path - use this to set the path directories for public and views directories in the config() method.
 * error-handler - the error-handler middleware will handle errors during development
 *
 */
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import * as errorHandler from 'errorhandler';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

/* Database models */
import Users from './db/models/Users';

/* Configs */
import { Passport } from './configs/passport';

/* Utils */
import { TransactionsController } from './db/controllers/transactions';
import { Utils } from './utils/utils';

export class Server {
  public app: express.Application;
  private utils: Utils;
  private passport: Passport;
  private transactionsController: TransactionsController;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.transactionsController = new TransactionsController();
    this.utils = new Utils();

    this.app = express();

    this.config();
    this.api();
  }

  public api() {
    this.app.post('/register', (req, res, next) => {
      const {
        body: { user }
      } = req;

      if (!user.email) {
        return res
          .status(400)
          .json(this.utils.formatErrorInfo(203, 'No username was specified.'));
      }

      if (!user.password) {
        return res
          .status(400)
          .json(this.utils.formatErrorInfo(202, 'No password was specified.'));
      }

      const finalUser = new Users(user);

      finalUser.setPassword(user.password);

      return finalUser
        .save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
    });

    this.app.post('/auth', (req, res, next) => {
      const {
        body: { user }
      } = req;

      if (!user.email) {
        return res
          .status(400)
          .json(this.utils.formatErrorInfo(203, 'No username was specified.'));
      }

      if (!user.password) {
        return res
          .status(400)
          .json(this.utils.formatErrorInfo(202, 'No password was specified.'));
      }

      return passport.authenticate(
        'local',
        { session: false },
        (err, passportUser, info) => {
          if (err) {
            return next(err);
          }

          if (passportUser) {
            const user = passportUser;
            const token = jwt.sign(
              user.toAuthJSON(),
              this.utils.getJWTSecretToken()
            );

            return res.send(token);
          }

          return res.status(403).send(info);
        }
      )(req, res, next);
    });

    this.app.get(
      '/transactions',
      passport.authenticate('jwt', { session: false }),
      async (req, res) => {
        const transactionIds = await this.transactionsController.getAllTransactionsId();
        res.send(transactionIds);
      }
    );

    this.app.get(
      '/transaction/:transactionId',
      passport.authenticate('jwt', { session: false }),
      async (req, res) => {
        const transaction = await this.transactionsController.getTransaction(
          req.params.transactionId
        );
        transaction
          ? res.send(transaction).status(200)
          : res
              .sendStatus(404)
              .send(this.utils.formatErrorInfo(600, 'Not found.'));
      }
    );
  }

  public config() {
    const MONGODB_CONNECTION: string = 'mongodb://localhost/transactions';
    mongoose.connect(MONGODB_CONNECTION);

    this.passport = new Passport();

    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.use(cors());

    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(methodOverride());

    this.app.use(cookieParser('SECRET_GOES_HERE'));

    this.app.use(function(
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      err.status = 404;
      next(err);
    });

    this.app.use(errorHandler());
  }
}
