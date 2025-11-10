import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowDown, faDownload, 
  faLocationDot, 
  faInbox, 
  faLaptop, 
  faBolt, 
  faPalette, 
  faScrewdriverWrench, 
  faLink, 
  faEnvelope, 
  faCertificate,
  faAward,
  faPrayingHands,
  faCode,
  faDatabase,
  faPaintBrush,
  faCodeBranch,
  faCloud,
  faTrain,
  faPenToSquare,
  faServer,
  faMousePointer
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faLinkedin, 
  faReact, 
  faNode, 
  faPython, 
  faFigma, 
  faGitAlt,
  faJs,
  faHtml5,
  faCss3Alt
} from '@fortawesome/free-brands-svg-icons';
import WeatherImg from './Assets/Weather-img.png';
import CalculatorImg from './Assets/Calculator-img.png';
import BMICalImg from './Assets/BMI-Cal-img.png';
import CF from './Assets/CF.png';
import fluto from './Assets/fluto.png';
import flog from './Assets/flog.png';
import flogram from './Assets/flogram.png';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Full Stack Developer", "Front-end Developer", "Back-end Developer"];
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const canvasRef = useRef(null);
  const networkCanvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      
      // Reset animation after transition completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [roles.length]);

  // Enhanced cursor tracking with hover detection
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
      
      if (isInteractive) {
        setIsHovering(true);
        setCursorVariant('hover');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
      
      // Add to cursor trail - reduced for performance
      setCursorTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-15); // Keep only last 15 positions
      });
    };

    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => {
      if (isHovering) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHovering]);

  // Animated network background with scrolling - SIMPLIFIED VERSION
  useEffect(() => {
    const canvas = networkCanvasRef.current;
    if (!canvas) {
      console.error('❌ Canvas ref not found!');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('❌ Could not get canvas context!');
      return;
    }
    
    // Set canvas size to cover entire page
    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        window.innerHeight
      );
      canvas.width = width;
      canvas.height = height;
      console.log('✅ Canvas initialized:', width, 'x', height);
    };
    
    setCanvasSize();

    // Create network nodes
    const nodes = [];
    const nodeCount = 100;
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 2 + 2
      });
    }

    console.log('✅ Created', nodeCount, 'network nodes');

    let frameCount = 0;
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Wrap around edges
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;
        
        // Draw node - BRIGHT and VISIBLE
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.9)'; // Bright blue
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(96, 165, 250, 1)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            const opacity = (1 - distance / 150) * 0.5;
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }
      
      frameCount++;
      if (frameCount % 60 === 0) {
        console.log('🎬 Animation frame:', frameCount);
      }
      
      requestAnimationFrame(animate);
    };

    animate();
    console.log('✅ Animation started!');

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('🧹 Network animation cleaned up');
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const projects = [
    {
      title: "Flogram",
      description: "Flogram is a social media platform that allows you to share your photos with the world.",
      tech: ["API", "React.js", "Tailwind CSS", "JavaScript" , "Redux", "Node.js", "Express.js", "MongoDB", "Mongoose", "Cloudinary" ,"Railway", "Vercel" , "Ant Design"],
      image: flogram,
      github: "https://github.com/chiyaw/Flogram",
      live: "https://flogram.vercel.app/login"
    },
    {
      title: "Weather Web-App",
      description: "Weather application fetching and displaying real-time weather data based on user location.",
      tech: ["API", "React.js", "Tailwind CSS", "OpenWeatherMap", "Vercel", "JavaScript"],
      image: WeatherImg,
      github: "https://github.com/chiyaw/Weather",
      live: "https://weather-three-inky.vercel.app/"
    },
    {
      title: "Calculator",
      description: "Lightweight calculator app built with vanilla JavaScript, HTML, and CSS for simple, responsive calculations",
      tech: ["React.js", "Tailwind CSS", "Javascript", "Vercel"],
      image: CalculatorImg,
      github: "https://github.com/chiyaw/Calculator",
      live: "https://calculator-vzv6.vercel.app/"
    },
    {
      title: "BMI Calculator",
      description: "BMI calculator built with React for dynamic and responsive health metric calculations.",
      tech: ["React.js", "Tailwind CSS", "Javascript", "Vercel"],
      image: BMICalImg,
      github: "https://github.com/chiyaw/New-BMI",
      live: "https://new-bmi-alpha.vercel.app/"
    }
  ];

  const projectsInProgress = [
    {
      title: "My Curated Feed",
      description: "My Curated Feed is a personalized blog feed manager that curates and organizes your favorite content in one place for easy reading.",
      tech: ["Next.js", "Tailwind CSS", "React.js", "TypeScript"],
      image: CF,
      github: "https://github.com/chiyaw/today-task",
      live: "https://today-task-one.vercel.app/"
    },
    {
      title: "Calendar AI",
      description: "Calendar AI is an AI-powered calendar assistant that summarizes your events and keeps you updated, helping you stay organized effortlessly.",
      tech: ["Next.js", "Tailwind CSS", "React.js", "TypeScript"],
      image: fluto,
      github: "https://github.com/chiyaw/MVP-NEW",
      live: "https://mvp-new-hazel.vercel.app/"
    }
  ];

  const certificates = [
    {
      title: "Responsive Web Design",
      issuer: "FreeCodeCamp",
      date: "2021",
      description: "Modern responsive design techniques using CSS Grid, Flexbox, and media queries for creating adaptive web layouts.",
      verifyLink: "https://www.freecodecamp.org/certification/fccfcd1871a-e545-4bea-982b-337d372863a7/responsive-web-design"
    },
    {
      title: "Research Paper Certificate",
      issuer: "Academic Publication",
      date: "2024",
      description: "Research contribution in breast cancer detection and analysis using machine learning techniques.",
      verifyLink: "https://github.com/chiyaw/Breast-Cancer/blob/main/Research-Paper-Certificate.pdf"
    },
    {
      title: "Digital Marketing",
      issuer: "Google",
      date: "2023",
      description: "Professional certification in Google tools and digital marketing fundamentals.",
      verifyLink: "https://skillshop.exceedlms.com/student/award/KHtx2vzUSWw8ujWpUCbw6Ajo"
    },
    {
      title: "Data Analysis with Python",
      issuer: "FreeCodeCamp",
      date: "2023",
      description: "Comprehensive Python programming for data analysis including NumPy, Pandas, and data visualization.",
      verifyLink: "https://www.freecodecamp.org/certification/fccfcd1871a-e545-4bea-982b-337d372863a7/data-analysis-with-python-v7"
    },
    {
      title: "Git and GitHub Fundamentals",
      issuer: "Le Wagon",
      date: "2025",
      description: "Introduction to version control, collaboration, and project management using Git and GitHub.",
      verifyLink: "https://app.lewagon.school/certificates/is6pz3yi24"
    }
  ];

  const skills = [
    { 
      name: "Frontend", 
      icon: faLaptop, 
      items: [
        { name: "React", icon: faReact, color: "#61DAFB" },
        { name: "TypeScript", icon: faCode, color: "#3178C6" },
        { name: "JavaScript", icon: faJs, color: "#F7DF1E" },
        { name: "Next.js", icon: faCode, color: "#000000" },
        { name: "HTML", icon: faHtml5, color: "#E34F26" },
        { name: "CSS", icon: faCss3Alt, color: "#1572B6" },
        { name: "Tailwind CSS", icon: faPaintBrush, color: "#06B6D4" }
      ] 
    },
    { 
      name: "Backend", 
      icon: faBolt, 
      items: [
        { name: "Node.js", icon: faNode, color: "#339933" },
        { name: "Express.js", icon: faServer, color: "#000000" },
        { name: "Python", icon: faPython, color: "#3776AB" },
        { name: "PostgreSQL", icon: faDatabase, color: "#4169E1" },
        { name: "MongoDB", icon: faDatabase, color: "#47A248" },
        { name: "MySQL", icon: faDatabase, color: "#4479A1" },
        { name: "Drizzle ORM", icon: faDatabase, color: "#60A5FA" },
        { name: "Cloudinary", icon: faCloud, color: "#3448C5" },
        { name: "Railway", icon: faTrain, color: "#0B0D0E" },
        { name: "Vercel", icon: faCodeBranch, color: "#000000" }
      ] 
    },
    { 
      name: "Design", 
      icon: faPalette, 
      items: [
        { name: "Figma", icon: faFigma, color: "#F24E1E" },
        { name: "Ant Design", icon: faPalette, color: "#0170FE" },
        { name: "Responsive Design", icon: faLaptop, color: "#60A5FA" },
        { name: "CodePen", icon: faPenToSquare, color: "#000000" }
      ] 
    },
    { 
      name: "Tools", 
      icon: faScrewdriverWrench, 
      items: [
        { name: "Git & Github", icon: faGitAlt, color: "#F05032" },
        { name: "VS Code", icon: faCode, color: "#007ACC" },
        { name: "Cursor.ai", icon: faMousePointer, color: "#60A5FA" },
        { name: "Figma", icon: faFigma, color: "#F24E1E" }
      ] 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-gray-100 relative">
      {/* Animated network background canvas - scrolls with page */}
      <canvas 
        ref={networkCanvasRef} 
        className="absolute top-0 left-0 pointer-events-none"
        style={{ 
          width: '100%',
          opacity: 0.8,
          zIndex: 1,
          display: 'block'
        }}
      />

      {/* Subtle ambient light effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Enhanced Custom Cursor */}
      
      {/* Main cursor dot - smooth and responsive */}
      <div 
        className="fixed rounded-full pointer-events-none mix-blend-screen transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: cursorVariant === 'hover' ? '8px' : cursorVariant === 'click' ? '6px' : '6px',
          height: cursorVariant === 'hover' ? '8px' : cursorVariant === 'click' ? '6px' : '6px',
          transform: `translate(-50%, -50%) scale(${cursorVariant === 'click' ? 0.8 : 1})`,
          backgroundColor: cursorVariant === 'hover' ? '#60a5fa' : '#93c5fd',
          boxShadow: cursorVariant === 'hover' 
            ? '0 0 30px rgba(96, 165, 250, 1), 0 0 60px rgba(96, 165, 250, 0.6)' 
            : '0 0 20px rgba(147, 197, 253, 0.8), 0 0 40px rgba(147, 197, 253, 0.4)',
          zIndex: 99999
        }}
      />

      {/* Outer cursor ring - follows with delay */}
      <div 
        className="fixed rounded-full pointer-events-none transition-all ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: cursorVariant === 'hover' ? '50px' : cursorVariant === 'click' ? '35px' : '40px',
          height: cursorVariant === 'hover' ? '50px' : cursorVariant === 'click' ? '35px' : '40px',
          transform: 'translate(-50%, -50%)',
          border: cursorVariant === 'hover' ? '2px solid rgba(96, 165, 250, 0.6)' : '2px solid rgba(96, 165, 250, 0.4)',
          transitionDuration: '200ms',
          zIndex: 99998
        }}
      />

      {/* Middle ring for depth */}
      <div 
        className="fixed rounded-full pointer-events-none transition-all ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: cursorVariant === 'hover' ? '30px' : '24px',
          height: cursorVariant === 'hover' ? '30px' : '24px',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(129, 140, 248, 0.3)',
          transitionDuration: '150ms',
          zIndex: 99997
        }}
      />

      {/* Ambient glow effect */}
      <div 
        className="fixed w-32 h-32 pointer-events-none blur-2xl transition-all duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          background: cursorVariant === 'hover'
            ? 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)',
          zIndex: 0
        }}
      />

      {/* Enhanced cursor trail with fade */}
      {cursorTrail.map((point, index) => {
        const progress = index / cursorTrail.length;
        const scale = 0.3 + progress * 0.7;
        return (
          <div
            key={point.id}
            className="fixed rounded-full pointer-events-none"
            style={{
              left: point.x,
              top: point.y,
              width: '4px',
              height: '4px',
              transform: `translate(-50%, -50%) scale(${scale})`,
              backgroundColor: `rgba(96, 165, 250, ${progress * 0.6})`,
              boxShadow: `0 0 ${10 * progress}px rgba(96, 165, 250, ${progress * 0.8})`,
              zIndex: 99996,
              transition: 'all 0.1s ease-out'
            }}
          />
        );
      })}

      {/* Click ripple effect */}
      {cursorVariant === 'click' && (
        <div 
          className="fixed rounded-full pointer-events-none animate-ping"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: '60px',
            height: '60px',
            transform: 'translate(-50%, -50%)',
            border: '2px solid rgba(96, 165, 250, 0.6)',
            zIndex: 99995,
            animationDuration: '0.6s'
          }}
        />
      )}

      <div className="relative" style={{ zIndex: 10 }}>
      {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/95 backdrop-blur-lg shadow-lg shadow-blue-500/10 border-b border-blue-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
                Namaste! <FontAwesomeIcon icon={faPrayingHands} className="text-blue-400" />
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'certificates', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                    className={`capitalize transition-all duration-200 hover:text-blue-400 hover:scale-110 ${
                      activeSection === item ? 'text-blue-400 font-semibold' : 'text-gray-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
        </div>
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold animate-bounce shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transition-all duration-300 hover:scale-110">
              SS
            </div>
          </div>
            <p className='text-left text-blue-400 font-semibold text-lg'>
            Its 
          </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Shreya Srivastava
          </h1>
          <div className="h-12 flex items-center justify-center mb-8 overflow-hidden">
              <div className="relative h-12 w-full max-w-lg">
      {roles.map((role, idx) => (
        <div
          key={idx}
                    className={`absolute w-full text-xl md:text-2xl text-gray-200 transition-all duration-500 whitespace-nowrap ${
            roleIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
          style={{ 
            top: 0,
            left: 0,
            right: 0,
                      textAlign: 'center'
          }}
        >
          {role}
        </div>
      ))}
    </div>
  </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/80"
            >
              View My Work
            </button>
            <a
            href="https://drive.google.com/file/d/1rrpkauFF8Wg4A1l9QO60UuRTeI1vehOg/view?usp=sharing"
            download="Shreya_Srivastava_Resume.pdf"
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/30"
          >
          <FontAwesomeIcon icon={faDownload} />
          Download CV
        </a>
          </div>
          <div className="animate-bounce">
              <div className="w-8 h-8 mx-auto text-blue-400 flex items-center justify-center text-2xl">
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
        <section id="about" className="py-20 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto shadow-lg shadow-blue-500/50"></div>
          </div>
          <div className="flex justify-center">
              <div className="max-w-3xl space-y-6 bg-gray-800/30 backdrop-blur-md p-8 rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300">
                <p className="text-lg text-gray-200 leading-relaxed text-justify">
                A passionate full-stack developer with a strong foundation in building scalable and user-friendly web applications. With hands-on experience in technologies like React.js, Next.js, Tailwind CSS, PostgreSQL, and Drizzle ORM, I thrive on turning ideas into impactful digital experiences.
              </p>
                <p className="text-lg text-gray-200 leading-relaxed text-justify">
                Currently, I'm honing my skills through real-world projects and an internship at Banghome, where I contribute across the stack.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-blue-400 bg-gray-800/50 px-4 py-2 rounded-full">
                  <FontAwesomeIcon icon={faLocationDot} />
                    <span className="text-gray-200">Prayagraj, India</span>
                </div>
                  <div className="flex items-center gap-2 text-blue-400 bg-gray-800/50 px-4 py-2 rounded-full">
                  <FontAwesomeIcon icon={faInbox} />
                    <span className="text-gray-200">shhreyasrivastava@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto shadow-lg shadow-blue-600/50"></div>
          </div>
            
            {/* All skills in one unified grid - no category labels */}
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-10 border border-blue-600/20 hover:border-blue-500/40 transition-all duration-300 shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                {skills.flatMap(skill => skill.items).map((item, i) => (
                  <div 
                    key={i} 
                    className="group/item flex flex-col items-center justify-center p-6 bg-gray-700/30 rounded-2xl hover:bg-blue-600/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 relative"
                  >
                    {/* Icon */}
                    <div className="mb-4">
                      <FontAwesomeIcon 
                        icon={item.icon} 
                        className="text-7xl transition-all duration-300 group-hover/item:scale-110"
                        style={{ 
                          color: '#60A5FA',
                          filter: 'drop-shadow(0 0 3px rgba(96, 165, 250, 0.3))',
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale',
                          fontSmooth: 'always',
                          textRendering: 'optimizeLegibility'
                        }}
                      />
                    </div>
                    
                    {/* Skill Name - always visible */}
                    <span className="text-sm text-gray-200 text-center font-semibold leading-tight">
                      {item.name}
                    </span>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none" 
                      style={{
                        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 70%)',
                        filter: 'blur(12px)'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Completed Projects
            </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto shadow-lg shadow-blue-600/50"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <div key={index} className="bg-gray-800/30 backdrop-blur-md rounded-xl overflow-hidden border border-blue-600/20 hover:border-blue-500/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-100">{project.title}</h3>
                    <p className="text-gray-200 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                        <span key={i} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full text-xs hover:bg-blue-600/30 transition-all duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm hover:scale-110 transform"
                    >
                      <FontAwesomeIcon icon={faLaptop} />
                      Code
                    </a>
                    <a 
                      href={project.live}
                        className="flex items-center gap-2 text-indigo-400 hover:text-teal-200 transition-colors text-sm hover:scale-110 transform"
                    >
                      <FontAwesomeIcon icon={faLink} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects in Progress Section */}
      <section id="projects-in-progress" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Projects in Progress
            </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto shadow-lg shadow-blue-600/50"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsInProgress.map((project, index) => (
                <div key={index} className="bg-gray-800/30 backdrop-blur-md rounded-xl overflow-hidden border border-blue-600/20 hover:border-blue-500/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20 group relative">
                  <div className="absolute top-4 right-4 z-10 bg-blue-500 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    In Progress
                  </div>
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-100">{project.title}</h3>
                    <p className="text-gray-200 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                        <span key={i} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full text-xs hover:bg-blue-600/30 transition-all duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm hover:scale-110 transform"
                    >
                      <FontAwesomeIcon icon={faLaptop} />
                      Code
                    </a>
                    <a 
                      href={project.live}
                        className="flex items-center gap-2 text-indigo-400 hover:text-teal-200 transition-colors text-sm hover:scale-110 transform"
                    >
                      <FontAwesomeIcon icon={faLink} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
        <section id="certificates" className="py-20 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Certifications
            </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto shadow-lg shadow-blue-600/50"></div>
              <p className="text-lg text-gray-200 mt-6">
              Continuous learning and professional development achievements
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
                <div key={index} className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-blue-600/20 hover:border-blue-500/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20 group">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-600/30">
                    <FontAwesomeIcon icon={faCertificate} />
                  </div>
                  <div>
                      <h3 className="text-lg font-semibold text-gray-100">{cert.title}</h3>
                      <p className="text-blue-300 text-sm">{cert.issuer}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                      <FontAwesomeIcon icon={faAward} className="text-indigo-400 text-sm" />
                      <span className="text-gray-200 text-sm">{cert.date}</span>
                  </div>
                    <p className="text-gray-200 text-sm leading-relaxed">{cert.description}</p>
                </div>
                <div className="pt-4 border-t border-gray-700/50">
                  <a 
                    href={cert.verifyLink}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium hover:scale-110 transform"
                  >
                    <FontAwesomeIcon icon={faLink} />
                    Verify Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto shadow-lg shadow-blue-600/50"></div>
              <p className="text-xl text-gray-200 mt-6">
              Ready to bring your ideas to life? Let's work together!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div className="flex items-center gap-4 bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-blue-600/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-xl shadow-lg shadow-blue-600/30">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-100">Email</h3>
                    <p className="text-gray-200">shhreyasrivastava@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-blue-600/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-xl shadow-lg shadow-blue-600/30">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-100">Location</h3>
                    <p className="text-gray-200">Prayagraj, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-blue-600/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-xl shadow-lg shadow-blue-600/30">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-100">GitHub</h3>
                    <a href="https://github.com/chiyaw" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-400 transition-colors">github/chiyaw</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-blue-600/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-xl shadow-lg shadow-blue-600/30">
                  <FontAwesomeIcon icon={faLinkedin} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-100">LinkedIn</h3>
                    <a href="https://www.linkedin.com/in/shreya-s-08b2bb214" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-400 transition-colors">linkedin/shreya</a>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-8 border border-blue-600/20 hover:border-blue-500/40 transition-all duration-300 shadow-xl shadow-blue-600/10">
              <div className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-100 placeholder-gray-400"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-100 placeholder-gray-400"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message"
                    rows={4}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-gray-100 placeholder-gray-400"
                  ></textarea>
                </div>
                <button 
                  onClick={() => alert('Message sent!')}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-emerald-600 hover:to-teal-600 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600/80 text-gray-900"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
        <footer className="bg-gray-900/50 backdrop-blur-sm py-8 border-t border-blue-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-300">
            <p>&copy; 2025 Shreya Srivastava All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Portfolio;