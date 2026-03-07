"use client";

import dynamic from "next/dynamic";
import { StateData } from "../types/types";
// Tell Next.js to only render Board on the client
const Board = dynamic(() => import("@/src/app/board/Board"), { ssr: false });

export default function BoardWrapper({
  initialData,
}: {
  initialData: StateData;
}) {
  return <Board initialData={initialData} />;
}
