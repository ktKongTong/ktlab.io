'use client'
import {HTMLProps} from "react";
import {cn} from "@/lib/utils";
import {projects} from "@/config";
import Link from "@/components/link";




export default function ProjectsPage(
{
  ...rest
}: HTMLProps<HTMLDivElement>
) {
  return (
    <section {...rest} className={cn('grow flex flex-col max-w-[1200px] w-full mx-auto items-start', rest.className)}>
        <div className={"text-4xl lg:pt-14 lg:pb-7 pt-10 pb-4"}>For Fun</div>
        <div className={"flex flex-wrap h-[calc(100vh-185px)] lg:h-[calc(100vh-245px)]"} >
          <div className={'grid md:grid-cols-2 lg:grid-cols-2 h-fit'}>
            {
              projects.map(project => (<ProjectCard {...project} key={project.github}/>))
            }
          </div>
        </div>
    </section>
  )
}


interface ProjectProps {
  previewUrl?: string;
  title: string;
  github: string;
  description?: string;
}
function ProjectCard({
  previewUrl,
  title,
  description,
  github,
}: ProjectProps) {
  return (
    <div className={'border rounded-md p-4 m-2 min-h-32 bg-gray-50/30 flex flex-col '}>
      <Link href={github}>
        {title}
      </Link>
      <p className={'text-primary/70'}>
        {description}
      </p>
      <div className={'w-full flex items-center justify-end mt-auto'}>
        <Link href={previewUrl ?? github} className={'animate-underline'}>查看</Link>
      </div>
    {/* stars */}
    </div>
  )
}