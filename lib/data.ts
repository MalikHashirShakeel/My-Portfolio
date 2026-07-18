import { IconType } from "react-icons";
import {
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiDjango,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiGit,
  SiGithub,
  SiStreamlit,
  SiGrafana,
  SiInfluxdb,
  SiFacebook,
  SiInstagram,
  SiLeetcode,
  SiCoursera,
} from "react-icons/si";
import { FaCss3Alt, FaLinkedin } from "react-icons/fa";

/* ====== NAVIGATION ====== */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/* ====== HERO ROLES ====== */
export const heroRoles = [
  "AI / ML Engineer",
  "Deep Learning Specialist",
  "System Builder",
];

/* ====== ABOUT ====== */
export const aboutData = {
  name: "Malik Hashir",
  title: "AI Engineer | Deep Learning Specialist | System Builder",
  bio: `Computer & Information Systems Engineering student at NED University of Engineering & Technology, Karachi. Passionate about Artificial Intelligence, Machine Learning, Deep Learning, System Design, and Computer Architecture. Solved 300+ LeetCode problems and continuously pushing the boundaries of what's possible with AI.`,
  stats: [
    { label: "CGPA", value: 3.84, suffix: "", decimals: 2 },
    { label: "Semester", value: 7, suffix: "th", decimals: 0 },
    { label: "LeetCode", value: 300, suffix: "+", decimals: 0 },
    { label: "Projects", value: 11, suffix: "+", decimals: 0 },
    { label: "Certifications", value: 2, suffix: "", decimals: 0 },
  ],
};

/* ====== SKILLS ====== */
export interface Skill {
  name: string;
  icon?: IconType;
  level: number; // 0-100
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI / ML / DL",
    color: "#00f5ff",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, level: 90 },
      { name: "PyTorch", icon: SiPytorch, level: 85 },
      { name: "Scikit-Learn", icon: SiScikitlearn, level: 88 },
      { name: "Pandas", icon: SiPandas, level: 92 },
      { name: "NumPy", icon: SiNumpy, level: 92 },
      { name: "Matplotlib", level: 85 },
      { name: "Seaborn", level: 82 },
    ],
  },
  {
    title: "ML Concepts",
    color: "#bf00ff",
    skills: [
      { name: "Supervised Learning", level: 92 },
      { name: "Unsupervised Learning", level: 85 },
      { name: "Reinforcement Learning", level: 75 },
      { name: "ANN / CNN / RNN", level: 90 },
      { name: "Backpropagation", level: 88 },
      { name: "Regularization", level: 85 },
      { name: "Optimization Algorithms", level: 82 },
    ],
  },
  {
    title: "Full Stack",
    color: "#ffd700",
    skills: [
      { name: "HTML", icon: SiHtml5, level: 95 },
      { name: "CSS", icon: FaCss3Alt, level: 90 },
      { name: "JavaScript", icon: SiJavascript, level: 88 },
      { name: "Django", icon: SiDjango, level: 85 },
      { name: "React", icon: SiReact, level: 82 },
      { name: "Next.js", icon: SiNextdotjs, level: 78 },
    ],
  },
  {
    title: "Databases",
    color: "#00f5ff",
    skills: [
      { name: "MySQL", icon: SiMysql, level: 85 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 82 },
      { name: "SQLite", icon: SiSqlite, level: 80 },
    ],
  },
  {
    title: "Tools",
    color: "#bf00ff",
    skills: [
      { name: "Git", icon: SiGit, level: 90 },
      { name: "GitHub", icon: SiGithub, level: 92 },
      { name: "Streamlit", icon: SiStreamlit, level: 85 },
      { name: "Grafana", icon: SiGrafana, level: 75 },
      { name: "InfluxDB", icon: SiInfluxdb, level: 72 },
    ],
  },
];

/* ====== EXPERIENCE ====== */
export interface ExperienceItem {
  company: string;
  website: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    company: "Techlogix Pakistan",
    website: "https://www.techlogix.com/",
    role: "Data Analysis Intern",
    period: "Jul 2026 – Present",
    location: "Karachi, Sindh, Pakistan · On-site",
    bullets: [
      "Performing comprehensive data analysis on diverse datasets, with a focus on banking and financial sector data.",
      "Developing analytical models and reports to assist banking clients and stakeholders in data-driven decision-making.",
      "Cleaning, preprocessing, and aggregating transactional data to uncover key operational trends and performance indicators."
    ]
  },
  {
    company: "National Center in Big Data and Cloud Computing",
    website: "https://ncbc.neduet.edu.pk/",
    role: "AI Research Intern",
    period: "Jun 2026 – Present · 1 mo",
    location: "Karāchi, Sindh, Pakistan · On-site",
    bullets: [
      "Conducting research on climate data provided by satellites",
      "Working under the National Center in Big Data and Cloud Computing (NCBC) at NED University"
    ]
  }
];

/* ====== PROJECTS ====== */
export interface Project {
  title: string;
  description?: string;
  tech: string[];
  github: string;
  live?: string;
  category: "ai" | "fullstack";
  date: string;
  bullets?: string[];
}

export const projects: Project[] = [
  {
    title: "PII Masking Model",
    date: "April 2025",
    github: "https://github.com/MalikHashirShakeel/PII-Masking-Model",
    category: "ai",
    bullets: [
      "Designed a production-grade PII redaction pipeline targeting names and email addresses via a multi-layer hybrid NLP strategy.",
      "Fine-tuned BERT (bert-base-uncased) on the WikiNeural corpus with synthetic email augmentation for the NER task, attaining F1 ≈ 0.97.",
      "Deployed Qwen2.5-1.5B as a zero-shot extractor through structured JSON prompting, eliminating the need for task-specific labeled training data.",
      "Fused regex pattern matching, BERT inference, and LLM fallback into a resilient cascade architecture, maximizing recall on edge cases.",
      "Established a comprehensive evaluation suite reporting precision, recall, and F1 to support continuous performance monitoring."
    ],
    tech: ["Python", "BERT", "Qwen2.5", "NLP", "NER", "Regex", "WikiNeural"]
  },
  {
    title: "Smart Traffic Analytics System",
    date: "June 2026 – Ongoing",
    github: "https://github.com/MalikHashirShakeel/YOLO-Traffic-Analytics",
    category: "ai",
    bullets: [
      "Developed an end-to-end real-time traffic monitoring system using YOLOv8m for high-accuracy vehicle detection with optimized confidence thresholds and multi-scale inference.",
      "Implemented multi-object tracking with ByteTrack/BoT-SORT, perspective-aware speed estimation, and dynamic density analysis for actionable traffic insights.",
      "Built a comprehensive video analytics pipeline with real-time visualization, virtual line counting, adaptive perspective correction, and color-coded congestion alerts (Low → Medium → High → Jam)."
    ],
    tech: ["Python", "YOLOv8", "ByteTrack", "BoT-SORT", "OpenCV", "Computer Vision"]
  },
  {
    title: "Image Captioning App",
    date: "2024",
    description:
      "Streamlit interface for an image captioning model. Upload an image, select algorithm and hyperparameters to generate captions.",
    tech: ["Python", "Streamlit", "ResNet", "LSTM"],
    github: "https://github.com/MalikHashirShakeel/Image-Captioning-App",
    category: "ai",
  },
  {
    title: "Image Captioning Model",
    date: "2024",
    description:
      "Core deep learning model using ResNet + LSTM encoder-decoder architecture to generate natural language captions for images.",
    tech: ["Python", "TensorFlow", "ResNet", "LSTM"],
    github: "https://github.com/MalikHashirShakeel/ImageCaptioningModel",
    category: "ai",
  },
  {
    title: "AI-Powered Network Analyzer",
    date: "2024",
    description:
      "Monitors and analyzes real-time network traffic. Detects anomalies, visualizes performance metrics with interactive dashboards.",
    tech: ["Python", "InfluxDB", "Grafana"],
    github: "https://github.com/Qambar-12/Network-Analyzer",
    category: "ai",
  },
  {
    title: "Fake News Detection",
    date: "2024",
    description:
      "NLP-based model that classifies news articles as real or fake using advanced text processing and machine learning techniques.",
    tech: ["Python", "NLP", "Scikit-Learn"],
    github: "https://github.com/MalikHashirShakeel/Fake-News-Detection",
    category: "ai",
  },
  {
    title: "Airline Customer Satisfaction",
    date: "2024",
    description:
      "Random Forest model that predicts airline customer satisfaction based on flight and service parameters.",
    tech: ["Python", "Scikit-Learn", "Random Forest"],
    github:
      "https://github.com/MalikHashirShakeel/Airline-Customer-Satisfaction-Prediction",
    category: "ai",
  },
  {
    title: "Breast Cancer Detection",
    date: "2024",
    description:
      "Logistic Regression model classifying tumors as Malignant or Benign with high accuracy on medical imaging data.",
    tech: ["Python", "Scikit-Learn", "Logistic Regression"],
    github: "https://github.com/MalikHashirShakeel/Breast-Cancer-Detection",
    category: "ai",
  },
  {
    title: "ClassConnect",
    date: "2024",
    description:
      "Full-featured Django virtual classroom management app. Teachers create classrooms, post assignments; students join, submit, and discuss.",
    tech: ["Django", "Tailwind CSS", "SQLite"],
    github: "https://github.com/MalikHashirShakeel/ClassConnect",
    category: "fullstack",
  },
  {
    title: "PayScript",
    date: "2024",
    description:
      "Django app for product management and professional PDF invoice generation using WeasyPrint.",
    tech: ["Django", "Tailwind CSS", "WeasyPrint"],
    github: "https://github.com/MalikHashirShakeel/PayScript",
    category: "fullstack",
  },
  {
    title: "Mega Blog App",
    date: "2024",
    description:
      "Production-level React blog application with rich text editing, authentication, and responsive design.",
    tech: ["React", "JavaScript"],
    github: "https://github.com/MalikHashirShakeel/Mega-Blog-App",
    category: "fullstack",
  },
];

/* ====== CERTIFICATIONS ====== */
export interface Certification {
  title: string;
  issuer: string;
  instructor: string;
  platform: string;
  url: string;
}

export const certifications: Certification[] = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    instructor: "Andrew Ng",
    platform: "Coursera",
    url: "https://coursera.org/share/13acb02f8a3301a9678302b28c6944dd",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford & DeepLearning.AI",
    instructor: "Andrew Ng",
    platform: "Coursera",
    url: "https://coursera.org/share/8d80ba4c82a3324282a5452d2e9cc7d4",
  },
];

/* ====== EDUCATION ====== */
export const education = {
  university: "NED University of Engineering & Technology",
  location: "Karachi, Pakistan",
  degree: "B.E. Computer & Information Systems Engineering",
  cgpa: "3.84",
  semester: "7th"
};

/* ====== CONTACT ====== */
export const contactInfo = {
  email: "malik2244h@gmail.com",
  phone: "+92 314 3083039",
  linkedin: "https://www.linkedin.com/in/malik-hashir-53a15a294/",
  github: "https://github.com/MalikHashirShakeel",
};

/* ====== SOCIAL LINKS ====== */
export interface SocialLink {
  label: string;
  url: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/malik-hashir-53a15a294/",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    url: "https://github.com/MalikHashirShakeel",
    icon: SiGithub,
  },
  {
    label: "LeetCode",
    url: "https://leetcode.com/u/Malik_Hashir/",
    icon: SiLeetcode,
  },
  {
    label: "Coursera",
    url: "https://www.coursera.org/user/a8470786ead2f3b87e401e56e8eb8669",
    icon: SiCoursera,
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/malik.hashir.833031",
    icon: SiFacebook,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/itsmalikhashir/",
    icon: SiInstagram,
  },
];

/* ====== EMAILJS CONFIG ====== */
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_zebhu2w",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_8qpm61k",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "UmFVvtvIqb0E57HM5",
};
