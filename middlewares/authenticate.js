import { httpError } from "../helpers/httpError.js";
import { validateAccessToken } from "../services/tokenServices.js";
import { findUser } from "../services/usersServices.js";

export const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, accessToken] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(httpError(401, "Not authorized"));
  }
  try {
    const userData = validateAccessToken(accessToken);
    const user = await findUser({ accessToken });

    if (!user || !userData) {
      next(httpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(httpError(401, error.message));
  }
};
