import { Toaster } from "../ui/toaster";
import Analytics from "./analytics";
import SpeedInsight from "./speedinsight";
export default function Utils() {
  return <>
    <SpeedInsight/>
    <Analytics/>
    <Toaster />
  </>
}