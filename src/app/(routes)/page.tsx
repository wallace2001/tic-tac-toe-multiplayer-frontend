import GameBoard from "./components/client";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  return (
    <ClientOnly>
      <GameBoard />
    </ClientOnly>
  )
}
