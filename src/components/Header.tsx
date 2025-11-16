import { useState, useEffect } from "react";
import { Shield, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const Header = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-xl bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent shadow-md transition-all duration-300 group-hover:shadow-elevated group-hover:scale-105">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TermGuard
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <button
                  onClick={() => scrollToSection("analyzer")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                >
                  Analyzer
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                >
                  How it works
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                >
                  FAQ
                </button>
              </>
            )}
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{user.email}</span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-300 hover:scale-105"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-accent/10 transition-all duration-300 hover:scale-105"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-elevated transition-all duration-300 hover:scale-105"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
