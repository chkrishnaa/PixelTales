import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound({
  icon: Icon,
  title,
  description,
  buttonText = "Go Home",
  buttonLink = "/",
}) {
  return (
    <section className="page-container flex min-h-[60vh] items-center justify-center py-10">
      <div className="w-full max-w-lg rounded-xl xs:rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-gray-800 dark:bg-gray-900">
        {Icon && (
          <div className="mb-5 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-turquoise-100 text-turquoise-600 dark:bg-turquoise-900/30 dark:text-turquoise-400">
              <Icon size={48} strokeWidth={2} />
            </div>
          </div>
        )}

        <h1 className="font-sans text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">{description}</p>

        <Link to={buttonLink} className="btn-primary mx-auto mt-6 inline-flex">
          <Home size={18} />
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
