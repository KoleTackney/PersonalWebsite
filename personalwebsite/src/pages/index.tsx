import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import type { TimeLineProps } from "../components/timeline";
import { Timeline } from "../components/timeline";
import { Contact } from "../components/contact";
import { Intro } from "../components/intro";
import timeLineJson from "./TimelineItems.json";

const Home: NextPage = () => {
  // const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [timelineItems, setTimelineItems] = useState<TimeLineProps[]>([]);

  useEffect(() => {
    // setProjects(projectJson.Projects);
    setTimelineItems(timeLineJson.Moments);
  }, []);

  return (
    <div className="bg-white dark:bg-stone-900 min-h-full">
      <Head>
        <title>Kole Tackney</title>
        <meta name="Kole Tackney" content="Software Developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-300 min-h-screen">
        <div className="max-w-5xl w-11/12 mx-auto">
          <Intro />
          <Timeline Items={timelineItems} />
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default Home;
