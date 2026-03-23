export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[12rem] font-display leading-none">404</h1>
      <p className="text-textSecondary mt-4 text-xl">The page you are looking for does not exist.</p>
      <a href="/" className="mt-8 border-b border-textPrimary pb-1 hover:text-textSecondary transition-colors">
        Return Home
      </a>
    </div>
  );
}
