import Link from "@/components/link";


export default function NotFound() {
  return (
    <div className={'min-h-screen flex flex-col px-10 md:px-40 items-center my-auto justify-center grow'}>
      <h2>404 Not Found</h2>
      <p>你来到了一片荒芜之地</p>
      <Link href="/" className={'lab-link '}>Go Home</Link>
    </div>
  )
}