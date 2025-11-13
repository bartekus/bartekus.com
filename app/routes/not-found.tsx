import { useLocation } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-bold gradient-text">404</h1>
        <p className="mb-4 text-2xl font-semibold text-foreground">Page not found</p>
        <p className="mb-8 text-text-muted">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="text-primary underline hover:no-underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
