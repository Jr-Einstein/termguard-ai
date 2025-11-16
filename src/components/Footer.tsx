import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">TermGuard</span>
            <span className="text-sm text-muted-foreground">© 2025</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-muted-foreground space-y-1">
          <p>This tool does not provide legal advice. Results are for informational purposes only.</p>
          <p>© 2025 Aman Kumar Singh</p>
        </div>
      </div>
    </footer>
  );
};
