'use client'
import {TImageProps} from "@/components/markdown/xlog/components/AdvancedImage";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import {decompressFromBase64} from "lz-string";
import {useTheme} from "next-themes";
// see https://github.com/excalidraw/excalidraw/issues/8923
// import {Excalidraw} from "@excalidraw/excalidraw"
// const Excalidraw = dynamic(
//   async () => import("@excalidraw/excalidraw").then(res => res.Excalidraw),
//   {
//     ssr: false,
//   },
// );

export function ExcalidrawSource(props: TImageProps) {
  const [load, setLoad] = useState(false);
  const {src, ...rest} = props
  const [data, setData] = useState<any>(undefined)
  const {theme} = useTheme()
  useEffect(() => {
    fetch(src).then(async (response) => {
      const text = await response.text()
      const [result, parts] = getDecompressedScene(text)
      const res = JSON.parse(result)
      if (result) {
        setData({
          ...res,
          appState: {
            ...(res.appState ?? {}),
            zoom: {
              value: 0.5
            },
            zenModeEnabled: true,
            viewModeEnabled: true,
          }
        })
      }
      setLoad(true);
    })
  }, [setLoad, src, setData])

  // fetch src convert to Excalidraw
  return <span className="h-[500px] relative rounded-lg flex flex-col items-center justify-center block">
    {
      load ? (
        <span className={"mx-auto text-lg"}>React 19 isn't yet supported by Excalidraw ...</span>
        // <Excalidraw
        //   initialData={data}
        //   theme={theme as any ?? 'light'}
        // />
      ) : <span className={"mx-auto text-lg"}>loading...</span>
    }
  </span>
}

const DRAWING_REG = /\n##? Drawing\n[^`]*(```json\n)([\s\S]*?)```\n/gm; //https://github.com/zsviczian/obsidian-excalidraw-plugin/issues/182
const DRAWING_REG_FALLBACK = /\n##? Drawing\n(```json\n)?(.*)(```)?(%%)?/gm;
export const DRAWING_COMPRESSED_REG =
  /(\n##? Drawing\n[^`]*(?:```compressed\-json\n))([\s\S]*?)(```\n)/gm; //https://github.com/zsviczian/obsidian-excalidraw-plugin/issues/182
const DRAWING_COMPRESSED_REG_FALLBACK =
  /(\n##? Drawing\n(?:```compressed\-json\n)?)(.*)((```)?(%%)?)/gm;
export const REG_LINKINDEX_HYPERLINK = /^\w+:\/\//;

const isCompressedMD = (data: string): boolean => {
  return data.match(/```compressed\-json\n/gm) !== null;
};

const getDecompressedScene = (
  data: string,
): [string, IteratorResult<RegExpMatchArray, any>] => {
  let res = data.matchAll(DRAWING_COMPRESSED_REG);

  //In case the user adds a text element with the contents "# Drawing\n"
  let parts;
  parts = res.next();
  if (parts.done) {
    //did not find a match
    res = data.matchAll(DRAWING_COMPRESSED_REG_FALLBACK);
    parts = res.next();
  }
  if (parts.value && parts.value.length > 1) {
    return [decompress(parts.value[2]), parts];
  }
  return ["", parts];
};

function decompress(text: string) {
  return decompressFromBase64(text.replaceAll("\n", "").replaceAll("\r", ""));

}