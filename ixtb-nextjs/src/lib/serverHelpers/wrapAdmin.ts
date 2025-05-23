import { NextAuthRequest } from "@/auth.ts";
import assert from "assert";
import { AnyFn, AnyObject } from "softkave-js-utils";
import { wrapUserAuthenticated } from "./wrapAuthenticated.ts";
import { IRouteContext } from "./wrapRoute.ts";
import { OwnServerError } from "fmdx-core/common/error";
import { assertCheckIsAdminEmail } from "fmdx-core/serverHelpers/isAdmin";

export const wrapAdmin = (
  routeFn: AnyFn<[NextAuthRequest, IRouteContext], Promise<AnyObject | void>>
) =>
  wrapUserAuthenticated((req, ctx, session) => {
    assert.ok(session, new OwnServerError("Unauthorized", 401));
    assert.ok(
      session.user?.email,
      new OwnServerError("User email is required", 401)
    );
    assertCheckIsAdminEmail(session.user.email);
    return routeFn(req, ctx);
  });
