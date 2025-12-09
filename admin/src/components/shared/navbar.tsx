import { useLocation } from "react-router-dom";

interface NavbarProps {
  button?: boolean;
  component?: React.ReactNode;
}

export const Navbar = ({ button, component }: NavbarProps) => {
  const { pathname } = useLocation();

  const pathname_to_title: Record<string, string> = {
    "/": "Kategoriyalar",
    "/products": "Mahsulotlar",
    "/admins": "Administratorlar",
  };

  return (
    <div className="w-full flex items-center justify-between px-4 h-[6vh] pb-2">
      <div className="flex items-center gap-4">
        <h1 className="text-sm text-muted-foreground">
          Saxifa:{" "}
          <span className="font-semibold text-xs md:text-sm text-accent-foreground capitalize">
            {pathname_to_title[pathname] || pathname.slice(1)}
          </span>
        </h1>
      </div>

      <div className="text-xs">
        {button && component}
      </div>
    </div>
  );
};
