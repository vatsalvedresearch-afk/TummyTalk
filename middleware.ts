import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(en|ar|zh-Hans|vi|hi)/:path*"],
};
