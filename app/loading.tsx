// import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background dark:bg-background transition-colors duration-200">
      {/* Decorative Accessible Live Region */}
      <div aria-live="polite" className="sr-only">
        Verifying security session, please wait...
      </div>

      {/* Tonal Layer Loader Container */}
      <div className="flex flex-col items-center gap-4 p-8 bg-card dark:bg-card border border-border dark:border-border rounded-large-card shadow-sm text-center max-w-xs w-full">
        {/* Customized Synchronous Spinner */}
        <div className="relative w-10 h-10">
          <div className="w-10 h-10 border-4 border-border dark:border-border rounded-pill" />
          <div className="absolute top-0 left-0 w-10 h-10 border-4 border-t-primary dark:border-t-primary rounded-pill animate-spin" />
        </div>

        <div>
          <p className="font-label font-semibold text-sm text-text-primary">
            Securing Workspace
          </p>
          <p className="font-body font-normal text-xs text-text-secondary mt-0.5">
            Evaluating authentication tokens...
          </p>
        </div>
      </div>
    </div>
  );
}
