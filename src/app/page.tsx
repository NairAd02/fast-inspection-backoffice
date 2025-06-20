import { paths } from "@/routes/path";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(paths.landing.root);
}
