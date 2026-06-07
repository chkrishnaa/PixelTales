import { Ghost } from "lucide-react";
import NotFound from "../components/NotFound";

export default function Page404() {
  return (
    <NotFound
      icon={Ghost}
      title="404 - Page Not Found"
      description="Looks like you've wandered into another dimension."
      buttonText="Back to Home"
      buttonLink="/"
    />
  );
}
