"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Github, ExternalLink, ChevronLeft, ChevronRight, Star, Calendar, Users, Zap } from "lucide-react";

interface Project {
  title: string;
  tag: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  images: string[];
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  stats?: {
    performance: number;
    loadTime: string;
    users: string;
    launchDate: string;
  };
}

interface ProjectDetailClientProps {
  project: Project | null;
  projectId: string;
}

export default function ProjectDetailClient({ project, projectId }: ProjectDetailClientProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-orange-50/30 pt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-lg mb-8">The project "{projectId}" doesn't exist.</p>
          <Button onClick={() => router.back()} className="rounded-2xl">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-orange-50/30 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="glass" 
          className="mb-8 rounded-2xl" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - iPhone Style Gallery */}
          <div className="sticky top-24">
            {/* Main Image/Video Display */}
            <div className="rounded-3xl glass overflow-hidden mb-6 relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                {project.video && !isVideoPlaying ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-4 hover:bg-black/70 transition-colors"
                    >
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </button>
                  </div>
                ) : project.video && isVideoPlaying ? (
                  <video 
                    className="w-full h-full object-cover" 
                    controls 
                    autoPlay
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={project.images[selectedImage]} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Navigation Arrows */}
                {project.images.length > 1 && !project.video && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Image Thumbnails Grid */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {project.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-2xl glass overflow-hidden cursor-pointer ${
                      selectedImage === index ? 'ring-2 ring-blue-500 ring-offset-2' : 'opacity-70 hover:opacity-100'
                    } transition-all`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Project Details */}
          <div className="space-y-8">
            {/* Header Section */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4"
              >
                {project.title}
              </motion.h1>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
                {project.tag}
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {project.longDescription}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {project.liveUrl && (
                  <Button className="rounded-2xl shadow-md">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" className="rounded-2xl">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </Button>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            {project.stats && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="rounded-2xl glass text-center">
                  <CardContent className="p-4">
                    <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{project.stats.performance}%</div>
                    <div className="text-sm text-gray-600">Performance</div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl glass text-center">
                  <CardContent className="p-4">
                    <Star className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{project.stats.loadTime}</div>
                    <div className="text-sm text-gray-600">Load Time</div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl glass text-center">
                  <CardContent className="p-4">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{project.stats.users}</div>
                    <div className="text-sm text-gray-600">Users</div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl glass text-center">
                  <CardContent className="p-4">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{project.stats.launchDate}</div>
                    <div className="text-sm text-gray-600">Launched</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Features Section */}
            <Card className="rounded-3xl glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Zap className="h-6 w-6 text-blue-600" /> Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-3 rounded-2xl bg-white/50"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technologies Section */}
            <Card className="rounded-3xl glass">
              <CardHeader>
                <CardTitle className="text-2xl">Technologies Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 bg-white/70 rounded-full text-sm font-medium text-gray-700 border border-white/20 shadow-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};