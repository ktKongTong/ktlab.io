export default defineComponent({
    name: 'Avatar',
    props: {
        name: {
            type: String,
            default: 'avatar',
            required: false
        },
        src: {
            type: String,
            default: ''
        },
    },
    setup({ name,src }) {
        return () => (
        <>
        <div class="flex-shrink-0">
            <img class="w-12 h-12 rounded-full" src={src} alt={name} />
        </div>
        </>
        )        
    }
})