
interface ImageProps {
    height: number
    width: number
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
    height={height}
    width={width}
    className={className}
    ></img>
    </>
    )

}

export default Image