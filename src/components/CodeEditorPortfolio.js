// app/page.js
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github, ExternalLink, Mail, Linkedin, Code, Book, Briefcase } from 'lucide-react';

const MatrixBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const emeraldGreen = '#10B981';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = emeraldGreen;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="matrix-canvas"
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-50"
    />
  );
};

const TerminalSection = () => {
  const [visibleCommands, setVisibleCommands] = useState([]);
  const commands = [
    {
      command: 'whoami',
      output: 'Bhavika Salunkhe'
    },
    {
      command: 'cat skills.txt',
      output: 'Full Stack Development | AI & Data Science | Problem Solving'
    },
    {
      command: 'git status',
      output: 'Currently working on: AI-powered projects and web applications'
    }
  ];

  useEffect(() => {
    const showCommands = async () => {
      for (let i = 0; i < commands.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVisibleCommands(prev => [...prev, commands[i]]);
      }
    };

    showCommands();
  }, []);

  return (
    <div className="bg-gray-900/80 rounded-lg border border-emerald-500/20 font-mono mb-8">
      <div className="flex items-center p-2 border-b border-emerald-500/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-4 text-sm text-gray-400">portfolio ~ bash</span>
      </div>
      <div className="p-4 space-y-4">
        {visibleCommands.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center text-emerald-400">
              <span className="mr-2">➜</span>
              <span className="text-gray-400">~/portfolio</span>
              <span className="ml-2 text-white">$ {item.command}</span>
            </div>
            <div className="mt-2 text-gray-300">{item.output}</div>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-5 bg-emerald-400"
        />
      </div>
    </div>
  );
};

const InteractiveProjectCard = ({ project }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const glowStyles = {
    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="relative bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg overflow-hidden"
    >
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={glowStyles}
      />

      <div className="relative z-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-bold text-gray-100 mb-3">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-emerald-400 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-500/20"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="flex space-x-4">
            <motion.a
              href={project.links.github}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href={project.links.live}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-2 right-2 text-emerald-500/10 text-6xl font-bold pointer-events-none select-none">
        {project.title[0]}
      </div>
    </motion.div>
  );
};

const AnimatedText = ({ text, className = "" }) => {
  return (
    <motion.span
      className={`inline-flex ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.span>
  );
};

const SkillCard = ({ skill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/20"
    >
      <h3 className="text-xl font-bold text-emerald-400 mb-4">
        {skill.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <span
            key={item}
            className="text-gray-300 bg-black/20 px-3 py-1 rounded-full border border-emerald-500/20"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const CodeEditorPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'contact'];

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const navHeight = 80; // Height of your navbar
    const top = element.offsetTop - navHeight;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
    setActiveSection(sectionId);
  };

  const projects = [
    {
      title: "Secure Data in Images",
      description: "Hide important text and files within images using AES algorithm",
      tech: ["Python", "Crypto Library", "StreamLit"],
      links: { github: "", live: "" }
    },
    {
      title: "CodeExplainer",
      description: "AI-powered code explanation tool using Gemini API",
      tech: ["TypeScript", "Next.js", "Gemini AI API"],
      links: { github: "", live: "" }
    },
    {
      title: "CodeTestForge",
      description: "Automated Python test case generator with code quality analysis",
      tech: ["Flask", "Python", "JavaScript"],
      links: { github: "", live: "#" }
    },
    {
      title: "Collaborative Whiteboard Application",
      description: "A real-time collaborative whiteboard application where multiple users can draw, sketch, and collaborate simultaneously.",
      tech: ["React", "Express", "Keycloak", "Bootstrap"],
      links: { github: "", live: "#" }
    }
  ];

  const skills = [
    { category: "Languages", items: ["C++", "Python", "JavaScript", "Java", "Rust"] },
    { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Flask", "PyTorch"] },
    { category: "Tools", items: ["Git", "Github", "Docker"] },
    { category: "Databases", items: ["MongoDB", "Postgres"] }
  ];

  return (
    <div className="min-h-screen text-gray-300 relative bg-gray-900">
      <MatrixBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-sm z-40 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-emerald-400"
            >
              AF
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex space-x-8"
            >
              {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-emerald-400 transition-colors relative group ${
                    activeSection === item.toLowerCase() ? 'text-emerald-400' : ''
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full" />
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-16 px-6 container mx-auto min-h-screen flex flex-col justify-center relative">
        <TerminalSection />
        <AnimatedText text="Hi, my name is" className="text-emerald-400 mb-4" />
        <AnimatedText
          text="Bhavika Salunkhe."
          className="text-5xl md:text-7xl font-bold text-gray-100 mb-4"
        />
        <AnimatedText
          text="Full Stack Developer & AI Enthusiast"
          className="text-4xl md:text-6xl font-bold text-gray-400 mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-xl text-gray-400 mb-8"
        >
          I am a software engineer studying AI and Data Science.
        </motion.p>
        <div className="flex space-x-4">
          <motion.a
              rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-emerald-400/10 border border-emerald-400 text-emerald-400 px-6 py-3 rounded flex items-center space-x-2 hover:bg-emerald-400/20 transition-colors"
          >
            <span>View Resume</span>
            <ChevronRight size={16} />
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex space-x-4"
          >
            <a href="https://github.com/bhavikasalunkhe26" className="text-gray-400 pt-2 hover:text-emerald-400 transition-colors" target="_blank"
              rel="noopener noreferrer">
              <Github size={40} />
            </a>
            <a href="https://www.linkedin.com/in/bhavika-salunkhe/" className="text-gray-400 pt-2 hover:text-emerald-400 transition-colors" target="_blank"
              rel="noopener noreferrer">
              <Linkedin size={40} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-6 container mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-100 mb-12 flex items-center gap-2"
        >
          <Briefcase className="text-emerald-400" />
          Experience
        </motion.h2>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-400/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-100">Intern</h3>
                <p className="text-emerald-400">Yhills</p>
              </div>
              <span className="text-gray-400">2022 - 2023</span>
            </div>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Collaborated on various web Development projects</li>
              <li>Worked onprogramming languages like Java and C++</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-400/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-100">Intern</h3>
                <p className="text-emerald-400">Sumago Infotech</p>
              </div>
              <span className="text-gray-400">2020 - 2021</span>
            </div>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Completed projects using HTML, CSS, and JavaScript</li>
              <li>Empowered myself to acquire new skills</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6 container mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-100 mb-12 flex items-center gap-2"
        >
          <Code className="text-emerald-400" />
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <InteractiveProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-6 container mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-100 mb-12 flex items-center gap-2"
        >
          <Book className="text-emerald-400" />
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 container mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-gray-900/80 rounded-lg border border-emerald-500/20"
        >
          <div className="flex items-center p-2 border-b border-emerald-500/20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-4 text-sm text-gray-400">contact.js</span>
          </div>
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">Get In Touch</h2>
            <p className="text-gray-400 mb-8">
              Currently looking for new opportunities. Feel free to reach out if you would like to connect!
            </p>
            <div className="flex justify-center space-x-6">
              <motion.a
                href=""
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
              rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Mail size={24} />
              </motion.a>
              <motion.a
                href="https://github.com/bhavikasalunkhe26"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
              rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/bhavika-salunkhe/"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
              rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CodeEditorPortfolio;
