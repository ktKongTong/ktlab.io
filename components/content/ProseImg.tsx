
import { withBase } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'
export default defineComponent({
    name: 'Image',
    props: {
        src: {
          type: String,
          default: ''
        },
        alt: {
          type: String,
          default: ''
        },
        width: {
          type: [String, Number],
          default: undefined
        },
        height: {
          type: [String, Number],
          default: undefined
        }
      },
    setup({ src, alt, width, height}) {
    const refinedSrc = computed(() => {
        if (src?.startsWith('/') && !src.startsWith('//')) {
            return withBase(src, useRuntimeConfig().app.baseURL)
        }
        return src
    })
      return () => <img src={refinedSrc.value} alt={alt} width={width} height={height} className={`max-w-full max-h-full  h-a w-a`} />
    },
  });