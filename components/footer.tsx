import LinkedIcon from '@/components/icon'

export default defineComponent({
  name: 'Footer',
  props: {
      socialIcons: {
          type: Array,
          default: []
      },
      author: {
          type: String,
          default: ''
      },
      title: {
          type: String,
          default: ''
      }
  },
  setup({socialIcons,author,title}, { emit, slots, expose }) {
      return () => (
            <footer class="mb-2 flex flex-col items-center ">
            <div class="mt-16 flex flex-col items-center">
              <div class="mb-3 flex space-x-4">
                {
                    socialIcons.map((socialIcon:any) => {
                        return (
                            <LinkedIcon 
                                key={socialIcon.id}
                                id={socialIcon.id}
                                href={socialIcon.href}
                            />
                        )
                    })
                }
              </div>
              <div class="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div>{author}</div>
                <div>{` • `}</div>
                <div>{`© ${new Date().getFullYear()}`}</div>
                <div>{` • `}</div>
                <a href="/">{title}</a>
              </div>
            </div>
          </footer>
          )
  }
})