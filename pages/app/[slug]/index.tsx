import AppLayout from "components/layout/app";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import LinkCard from "@/components/app/link-card";
import PlaceholderCard from "@/components/app/placeholder-card";
import { useEffect } from "react";
import { ProjectProps } from "@/lib/api/types";

export default function ProjectLinks() {
  const router = useRouter();
  const { slug } = router.query as {
    slug: string;
  };

  const { data, error } = useSWR<ProjectProps>(
    router.isReady && `/api/projects/${slug}`,
    fetcher
  );

  useEffect(() => {
    if (error) {
      router.push("/404");
    }
  }, [error]);

  return (
    <AppLayout>
      <div className="my-10 grid grid-cols-1 gap-3">
        {data?.links && data.links.length > 0
          ? data.links.map((props) => (
              <LinkCard key={props.key} props={props} slug={slug} />
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <PlaceholderCard key={i} />
            ))}
      </div>
    </AppLayout>
  );
}
