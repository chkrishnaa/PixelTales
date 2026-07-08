export default function SectionTitle({ icon: Icon, children, action }) {
  return (
    <div className="mt-10 mb-5 flex flex-wrap items-center justify-between gap-2">
      <h2 className="font-display flex items-center gap-2 text-xl text-turquoise-600 dark:text-turquoise-400 md:text-2xl">
        {Icon && (
          <Icon className="size-6 shrink-0 text-turquoise-500" aria-hidden />
        )}
        {children}
      </h2>
      {action}
    </div>
  );
}
