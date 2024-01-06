import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { prisma } from "@/db";
import paths from "@/paths";

type TopicListProps = {};

const TopicList = async (props: TopicListProps) => {
  // Grab all topics from db
  const topics = await prisma.topic.findMany();

  const renderedTopics = topics.map((topic) => (
    <div key={topic.id}>
      <Link href={paths.postShow(topic.slug, topic.id)}>
        <Chip color="warning" variant="shadow">
          {topic.slug}
        </Chip>
      </Link>
    </div>
  ));

  return (
    <div className="mt-2 flex flex-row flex-wrap gap-2">{renderedTopics}</div>
  );
};

export default TopicList;
