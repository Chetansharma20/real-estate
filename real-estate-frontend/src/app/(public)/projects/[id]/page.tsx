import ProjectDetailPage from "./client-page";
import { ProjectSEOContent, getProjectSEOData } from "./seo-content";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <ProjectDetailPage />
      <ProjectSEOContent slug={id} />
    </>
  );
}

