import React, { useState, useEffect } from 'react';
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
  faPrayingHands
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import WeatherImg from './Assets/Weather-img.png';
import CalculatorImg from './Assets/Calculator-img.png';
import BMICalImg from './Assets/BMI-Cal-img.png';
import CF from './Assets/CF.png';
import fluto from './Assets/fluto.png';
import flog from './Assets/flog.png';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Full Stack Developer", "Front-end Developer", "Back-end Developer"];
  const [isTransitioning, setIsTransitioning] = useState(true);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const projects = [
    {
      title: "Weather Web-App",
      description: "Weather application fetching and displaying real-time weather data based on user location.",
      tech: ["API", "React.js", "CSS"],
      image: WeatherImg,
      github: "https://github.com/chiyaw/Weather",
      live: "https://weather-three-inky.vercel.app/"
    },
    {
      title: "Calculator",
      description: "Lightweight calculator app built with vanilla JavaScript, HTML, and CSS for simple, responsive calculations",
      tech: ["React.js", "CSS", "Javascript"],
      image: CalculatorImg,
      github: "https://github.com/chiyaw/Calculator",
      live: "https://calculator-vzv6.vercel.app/"
    },
    {
      title: "BMI Calculator",
      description: "BMI calculator built with React for dynamic and responsive health metric calculations.",
      tech: ["React.js", "CSS", "Javascript"],
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
    },
    {
      title: "Flogram",
      description: "Flogr is a social media platform that allows you to share your photos with the world.",
      tech: ["Next.js", "Tailwind CSS", "React.js", "JavaScript"],
      image: flog,
      github: "https://github.com/chiyaw/Flogr",
      live: "https://flogram-undf.vercel.app/login"
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
    { name: "Frontend", icon: faLaptop, items: ["React", "TypeScript", "Tailwind CSS"] },
    { name: "Backend", icon: faBolt, items: ["Node.js", "Python", "PostgreSQL", "MySQL"] },
    { name: "Design", icon: faPalette, items: ["Figma", "Responsive Design", "CodePen"] },
    { name: "Tools", icon: faScrewdriverWrench, items: ["Git & Github", "Cursor.ai", "VS Code", "Vercel"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Namaste!<FontAwesomeIcon icon={faPrayingHands} />
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'certificates', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 hover:text-purple-400 ${
                    activeSection === item ? 'text-purple-400' : 'text-gray-300'
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
          <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
        </div>
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold animate-bounce">
              SS
            </div>
          </div>
          <p className='text-left text-purple-400'>
            Its 
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Shreya Srivastava
          </h1>
          <div className="h-12 flex items-center justify-center mb-8 overflow-hidden">
    <div className="relative h-12 w-full max-w-lg"> {/* Added max-width */}
      {roles.map((role, idx) => (
        <div
          key={idx}
          className={`absolute w-full text-xl md:text-2xl text-gray-300 transition-all duration-500 whitespace-nowrap ${
            roleIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
          style={{ 
            top: 0,
            left: 0,
            right: 0,
            textAlign: 'center' // Center the text
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <a
            href="https://drive.google.com/file/d/1rrpkauFF8Wg4A1l9QO60UuRTeI1vehOg/view?usp=sharing"
            download="Shreya_Srivastava_Resume.pdf"
            className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
          <FontAwesomeIcon icon={faDownload} />
          Download CV
        </a>
          </div>
          <div className="animate-bounce">
            <div className="w-8 h-8 mx-auto text-purple-400 flex items-center justify-center text-2xl">
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          <div className="flex justify-center">
            <div className="max-w-3xl space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed text-justify">
                A passionate full-stack developer with a strong foundation in building scalable and user-friendly web applications. With hands-on experience in technologies like React.js, Next.js, Tailwind CSS, PostgreSQL, and Drizzle ORM, I thrive on turning ideas into impactful digital experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed text-justify">
                Currently, I'm honing my skills through real-world projects and an internship at Banghome, where I contribute across the stack.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>Prayagraj, India</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <FontAwesomeIcon icon={faInbox} />
                  <span>shhreyasrivastava@gmail.com</span>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-purple-400 mb-4 flex justify-center text-3xl">
                  <FontAwesomeIcon icon={skill.icon} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-white">{skill.name}</h3>
                <div className="space-y-2">
                  {skill.items.map((item, i) => (
                    <div key={i} className="text-gray-300 text-center text-sm bg-gray-700/50 rounded-full px-3 py-1">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects in Progress Section */}
      <section id="projects-in-progress" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects in Progress
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsInProgress.map((project, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      <FontAwesomeIcon icon={faLaptop} />
                      Code
                    </a>
                    <a 
                      href={project.live}
                      className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors text-sm"
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


      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Completed Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      <FontAwesomeIcon icon={faLaptop} />
                      Code
                    </a>
                    <a 
                      href={project.live}
                      className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors text-sm"
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
      <section id="certificates" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
            <p className="text-lg text-gray-300 mt-6">
              Continuous learning and professional development achievements
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon icon={faCertificate} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                    <p className="text-purple-300 text-sm">{cert.issuer}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faAward} className="text-pink-400 text-sm" />
                    <span className="text-gray-300 text-sm">{cert.date}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
                </div>
                <div className="pt-4 border-t border-gray-700/50">
                  <a 
                    href={cert.verifyLink}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
            <p className="text-xl text-gray-300 mt-6">
              Ready to bring your ideas to life? Let's work together!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-gray-300">shhreyasrivastava@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-gray-300">Prayagraj, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">GitHub</h3>
                  <a href="https://github.com/chiyaw" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors">github/chiyaw</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                  <FontAwesomeIcon icon={faLinkedin} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/shreya-s-08b2bb214" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors">linkedin/shreya</a>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
              <div className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message"
                    rows={4}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  onClick={() => alert('Message sent!')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Shreya Srivastava All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;