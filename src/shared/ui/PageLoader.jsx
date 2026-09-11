import Spinner from "./Spinner";

export default function PageLoader({
  message = "Loading...",

  fullScreen = true,

  className = "",
}) {
  return (
    <div
      className={[
        "page-loader",

        fullScreen &&
          "page-loader--fullscreen",

        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
    >
      <Spinner size="lg" />

      <p className="page-loader-text">
        {message}
      </p>
    </div>
  );
}