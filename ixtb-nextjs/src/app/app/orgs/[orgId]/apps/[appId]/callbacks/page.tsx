import { auth } from "@/auth";
import { CallbacksPage } from "@/src/components/callback/callbacks-page";
import { kClientPaths } from "@/src/lib/clientHelpers/clientPaths";
import { kAppConstants } from "fmdx-core/definitions/appConstants";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { JSX } from "react";

export const metadata: Metadata = {
  title: kAppConstants.name,
  description: kAppConstants.description,
};

type AppCallbacksPageProps = {
  params: Promise<{
    orgId: string;
    appId: string;
  }>;
};

export default async function Page(
  props: AppCallbacksPageProps
): Promise<JSX.Element> {
  const { orgId, appId } = await props.params;
  const session = await auth();
  if (!session) {
    return redirect(
      kClientPaths.withURL(
        kClientPaths.signinWithRedirect(
          kClientPaths.app.org.app.callbacks.index(orgId, appId)
        )
      )
    );
  }

  return <CallbacksPage appId={appId} />;
}
