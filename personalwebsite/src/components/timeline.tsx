import Title from "./title";

export type TimeLineProps = {
  name: string;
  year: number;
  duration: string;
  details: string;
};

export interface TimelineList {
  Items: TimeLineProps[];
}

export const TimelineCard = (
  { name, year, duration, details }: TimeLineProps,
) => {
  return (
    <ol className="flex flex-col md:flex-row relative border-l border-stone-300 dark:border-stone-700">
      <li className="mb-10 ml-4">
        <div className="absolute w-3 h-3 bg-stone-300 dark:border-stone-700 rounded-full mt-2.5 -left-1.5 border border-white" />
        <p className="flex flex-wrap gap-4 flex-row items-center justify-start">
          <span className="inline-block px-2 py-1 font-semibold bg-stone-900 dark:bg-stone-200 text-white dark:text-stone-900 rounded-md">
            {year}
          </span>
          <h1 className="text-lg text-semibold text-stone-900 dark:text-stone-200">{name}</h1>
          <div className="my-1 text-sm font-normal text-stone-600 dark:text-stone-200">
            {duration}
          </div>
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-200">{details}</p>
      </li>
    </ol>
  );
};

export const Timeline = ({ Items }: TimelineList) => {
  return (
    <div className="flex flex-col md:flex-row justify-center my-20">
      <div className="w-full">
      <Title>Timeline</Title>
        {Items.map(({ name, year, duration, details }) => (
          <TimelineCard
            key={name}
            name={name}
            year={year}
            duration={duration}
            details={details}
          />
        ))}
      </div>
    </div>
  );
};
