import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import SolutionsDesign from "./pages/SolutionsDesign";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Formations from "./pages/Formations";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import CommentsAdmin from "./pages/admin/CommentsAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import BlogEditor from "./pages/admin/BlogEditor";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import ProjectEditor from "./pages/admin/ProjectEditor";
import DesignSystemAdmin from "./pages/admin/DesignSystemAdmin";
import AnimationsAdmin from "./pages/admin/AnimationsAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/solutions-design" element={<SolutionsDesign />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="commentaires" element={<CommentsAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="blog/nouveau" element={<BlogEditor />} />
            <Route path="blog/modifier/:id" element={<BlogEditor />} />
            <Route path="projets" element={<ProjectsAdmin />} />
            <Route path="projets/nouveau" element={<ProjectEditor />} />
            <Route path="projets/modifier/:id" element={<ProjectEditor />} />
            <Route path="design-system" element={<DesignSystemAdmin />} />
            <Route path="animations" element={<AnimationsAdmin />} />
            <Route path="parametres" element={<SettingsAdmin />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
