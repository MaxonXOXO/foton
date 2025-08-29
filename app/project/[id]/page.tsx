import ProjectDetailClient from './ProjectDetailClient';

// Enhanced mock project data
const projectData = {
  "product-microsite": {
    title: "Product Microsite",
    tag: "Launch page",
    description: "A comprehensive product launch website",
    longDescription: "This microsite was designed to showcase our client's innovative product line with cutting-edge animations and user engagement features. Built with performance in mind, it loads in under 2 seconds and has a perfect Lighthouse score.",
    features: [
      "Interactive product configurator with real-time preview",
      "3D product visualization with WebGL rendering",
      "Real-time inventory system integration",
      "Multi-language and currency support",
      "SEO optimized structure with schema markup"
    ],
    technologies: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion", "Sanity CMS", "Stripe"],
   images: [
  "https://via.placeholder.com/600x800/0077B6/FFFFFF?text=Project+Image+1",
  "https://via.placeholder.com/600x800/FF6B35/FFFFFF?text=Project+Image+2",
  "https://via.placeholder.com/600x800/4CAF50/FFFFFF?text=Project+Image+3"
],
    video: "/project-demo.mp4",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    stats: {
      performance: 98,
      loadTime: "1.8s",
      users: "50K+",
      launchDate: "2024"
    }
  },
  "portfolio": {
    title: "Portfolio Platform",
    tag: "Case studies",
    description: "A showcase of our best work",
    longDescription: "This portfolio platform features our most successful projects with detailed case studies, client testimonials, and interactive project galleries. Designed to convert visitors into clients.",
    features: [
      "Interactive project galleries with filtering",
      "Detailed case studies with metrics",
      "Client testimonial carousel",
      "Contact form with CRM integration",
      "Performance analytics dashboard"
    ],
    technologies: ["React", "Framer Motion", "Contentful CMS", "Vercel Analytics", "Nodemailer"],
    images: ["/project-2-1.jpg", "/project-2-2.jpg"],
    liveUrl: "https://portfolio.example.com",
    githubUrl: "https://github.com/example/portfolio",
    stats: {
      performance: 100,
      loadTime: "1.2s",
      users: "25K+",
      launchDate: "2024"
    }
  },
  // Add other projects with similar structure...
};

export async function generateStaticParams() {
  return Object.keys(projectData).map((id) => ({ id }));
}

async function getProjectData(id: string) {
  return projectData[id as keyof typeof projectData] || null;
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectData(params.id);
  return <ProjectDetailClient project={project} projectId={params.id} />;
}