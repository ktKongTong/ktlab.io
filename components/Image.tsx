
interface ImageProps {
    height?: number
    width?: number
    src: string
    alt: string
    className?: string
}

const Image = ({height,width,src,alt,className }: ImageProps) => {
    return (
        <>
    <img 
    alt={alt}     
    src={src}
    height={height?height:''}
    width={width?width:''}
    // class={className}
    ></img>
    </>
    )

}
// export default Image
export default defineComponent({
    name: 'Image',
    props: {
        height: {
            type: Number,
            default: ''
        },
        width: {
            type: Number,
            default: ''
        },
        src: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: ''
        },
    },
    setup({ height,width,src,alt }) {
        return () => (
        <>
        <img 
        alt={alt}     
        src={src}
        height={height?height:''}
        width={width?width:''}
        ></img>
        </>)
    }
})