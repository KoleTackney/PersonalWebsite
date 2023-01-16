import Title from "./title";

export type ProjectCardProps = {
  name: string;
  imageURL?: string;
  description: string;
  stack: string[];
};

export interface ProjectCardList {
  Items: ProjectCardProps[];
}

function ProjectCard({ name, description, stack, imageURL }: ProjectCardProps) {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700 dark:text-gray-200">{name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      {stack.map((item) => (
        <span key={item} className="text-xs text-gray-600 dark:text-gray-300">
          {item}
        </span>
      ))}
      <p className="text-xs text-gray-600 dark:text-gray-300">{imageURL}</p>
    </section>
  );
}

export function Projects({ Items }: ProjectCardList) {
  return (
    <div className="flex flex-col justify-center">
      <Title>Projects</Title>
      <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-3 lg:w-2/3">
        {Items.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.description}
            stack={project.stack}
          />
        ))}
      </div>
    </div>
  );
}
