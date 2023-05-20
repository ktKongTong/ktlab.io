import { PageSEO } from '@/components/seo'
import {siteMetadata} from '@/data/siteMetadata'
import PageTitle from '~/components/title'
import ProjectCard from  '~/components/ProjectCard'

export default defineComponent({
  name: 'Project',
  setup(props, { emit, slots, expose }) {
      return () => (
          <div class="grid-content-center max-w-5xl m-auto">
                <PageSEO title={siteMetadata.title} description="Projects" />
                <div class="divide-y divide-red-200 dark:divide-gray-700">
                    <PageTitle class="mt-a mx-20px">Projects</PageTitle>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
                      {
                        siteMetadata.projects.map((project) => (
                          <ProjectCard
                                title={project.title}
                                description={project.description}
                                link={project.link}
                                github={project.github}
                                preview={project.preview}
                            />
                        ))
                      }
                    </div>
                </div>
          </div>
      )
  }
})