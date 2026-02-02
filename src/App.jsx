import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Globe, MapPin, Sparkles, ArrowRight, MousePointer2, Heart, Lightbulb, Bot, User, AlertCircle, CheckCircle, Box } from 'lucide-react';

// Lazy load Three.js visualization for better performance
const TechVisualization = React.lazy(() => import('./components/TechVisualization'));

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  en: {
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    hero: {
      greeting: 'Hello, I am',
      name: 'ZAWE ZAW HTET',
      role: 'IT Student',
      description: 'Focused on cloud technologies, AI integration, and practical business systems.',
      cta: 'View My Work',
      scroll: 'Scroll to discover'
    },
    about: {
      title: 'About Me',
      bio: "I am an IT student with a strong interest in cloud technologies and AI. I focus on how AI can be practically applied to business systems like CRM and cloud-based applications. I value understanding how systems work rather than just using tools, learning through hands-on project development. I am motivated to grow as an engineer in a cloud-oriented environment where I can continuously learn and contribute through real-world development.",
      status: 'Available for opportunities',
      location: 'Japan'
    },
    workflow: {
      title: 'How I Think',
      steps: [
        'Understand business requirements',
        'Design simple and scalable data structures',
        'Build clear UI for non-technical users',
        'Improve through iteration and feedback'
      ]
    },
    aiUsage: {
      title: 'How I Use AI',
      description: 'AI is my development accelerator. I review, modify, and understand all generated code before using it.'
    },
    outsideCode: {
      title: 'Outside of Code',
      items: [
        { icon: '✈️', label: 'Travel', desc: 'Adaptability to new environments' },
        { icon: '🎮', label: 'Gaming', desc: 'Problem-solving mindset' },
        { icon: '💪', label: 'Gym', desc: 'Consistency and self-discipline' }
      ]
    },
    tech: { title: 'Tech Stack' },
    visualization: {
      title: 'Technology Ecosystem',
      subtitle: 'How my skills connect to deliver business value'
    },
    projects: {
      title: 'Projects',
      subtitle: 'Scroll horizontally to explore',
      items: [
        {
          title: 'CRM Dashboard',
          problem: 'Customer data scattered across spreadsheets, making sales tracking difficult.',
          solution: 'Salesforce-inspired dashboard to centralize customer and sales management.',
          tags: ['JavaScript', 'CSS', 'HTML'],
          github: 'https://github.com/Z200-WEB/CRM_DSHBOARD.git'
        },
        {
          title: 'Restaurant Ordering System',
          problem: 'Manual order-taking causing delays and errors in busy restaurants.',
          solution: 'Table-based digital ordering system to streamline operations.',
          tags: ['PHP', 'CSS', 'JavaScript'],
          github: 'https://github.com/Z200-WEB/class-project.git'
        },
        {
          title: 'Support Case Manager',
          problem: 'Customer inquiries scattered, making status tracking difficult.',
          solution: 'Centralized dashboard to manage priorities and case status.',
          tags: ['Tailwind', 'React', 'JavaScript'],
          github: 'https://github.com/Z200-WEB/case-management-system.git'
        }
      ],
      view: 'View on GitHub',
      problemLabel: 'Problem',
      solutionLabel: 'Solution'
    },
    connect: {
      title: "Let's Connect",
      subtitle: 'Open for collaborations and new opportunities'
    },
    footer: 'Crafted with passion & code'
  },
  jp: {
    nav: { work: '作品', about: '私について', contact: '連絡' },
    hero: {
      greeting: 'こんにちは、',
      name: 'ズェーゾーテッ',
      role: 'IT学生',
      description: 'クラウド技術、AI活用、実務システムに注力しています。',
      cta: '作品を見る',
      scroll: 'スクロールして発見'
    },
    about: {
      title: '私について',
      bio: 'IT分野を学ぶ学生として、クラウド技術やAIに強い関心を持っています。AIをCRMやクラウド型システムなど、実際のビジネス現場でどのように活用できるかに興味を持ち、学習を進めています。ただツールを使うだけでなく、「仕組みを理解すること」を大切にしており、実際に手を動かしながらプロジェクトベースで学ぶことを意識しています。クラウド技術を強みとする環境で、実務を通じて成長し、価値を提供できるエンジニアを目指しています。',
      status: '機会を探しています',
      location: '日本'
    },
    workflow: {
      title: '私の考え方',
      steps: [
        '業務要件を理解する',
        'シンプルで拡張性のあるデータ設計',
        '非エンジニアにも分かりやすいUIを構築',
        'フィードバックをもとに改善を繰り返す'
      ]
    },
    aiUsage: {
      title: 'AIの活用方法',
      description: 'AIは開発を加速するためのツールです。生成されたコードは必ず確認・修正し、理解した上で使用しています。'
    },
    outsideCode: {
      title: 'コード以外の時間',
      items: [
        { icon: '✈️', label: '旅行', desc: '環境変化への適応力' },
        { icon: '🎮', label: 'ゲーム', desc: '課題解決力' },
        { icon: '💪', label: 'ジム', desc: '継続力と自己管理' }
      ]
    },
    tech: { title: 'テックスタック' },
    visualization: {
      title: 'テクノロジーエコシステム',
      subtitle: 'スキルがどのようにビジネス価値につながるか'
    },
    projects: {
      title: 'プロジェクト',
      subtitle: '横にスクロールして探索',
      items: [
        {
          title: 'CRMダッシュボード',
          problem: '顧客データがスプレッドシートに分散し、営業状況の把握が困難。',
          solution: '顧客・営業管理を一元化するSalesforce風ダッシュボード。',
          tags: ['JavaScript', 'CSS', 'HTML'],
          github: 'https://github.com/Z200-WEB/CRM_DSHBOARD.git'
        },
        {
          title: 'レストラン注文システム',
          problem: '手動の注文受付による遅延とミスの発生。',
          solution: '業務効率化を目的としたテーブル注文システム。',
          tags: ['PHP', 'CSS', 'JavaScript'],
          github: 'https://github.com/Z200-WEB/class-project.git'
        },
        {
          title: 'サポートケース管理',
          problem: '問い合わせ管理が分散し、状況把握が困難。',
          solution: '対応状況や優先度を一元管理するダッシュボード。',
          tags: ['Tailwind', 'React', 'JavaScript'],
          github: 'https://github.com/Z200-WEB/case-management-system.git'
        }
      ],
      view: 'GitHubで見る',
      problemLabel: '課題',
      solutionLabel: '解決策'
    },
    connect: {
      title: 'つながりましょう',
      subtitle: 'コラボレーションと新しい機会を求めています'
    },
    footer: '情熱とコードで作られました'
  }
};

// ============================================
// 3D CARD COMPONENT (Like Lanyard Badge)
// ============================================
const Card3D = ({ children, className = '', badge = false, title = '', subtitle = '' }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;

    setRotation({ x: rotateX, y: rotateY });

    // Glare effect position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      {/* Lanyard Strap */}
      {badge && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-32 z-0">
          {/* Strap */}
          <div className="relative">
            <div className="w-6 h-36 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 rounded-sm mx-auto shadow-lg"
              style={{ transform: `rotateY(${rotation.y * 0.3}deg)` }}>
              {/* Strap text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[8px] text-gray-400 font-bold tracking-widest whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                  IT STUDENT • JAPAN
                </span>
              </div>
            </div>
            {/* Clip */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full border-2 border-gray-600 shadow-md" />
          </div>
        </div>
      )}

      {/* 3D Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative cursor-pointer transition-transform duration-200 ease-out ${className}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Frame - Wooden/Dark theme */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 50%, #1a1a2e 100%)',
            boxShadow: isHovered
              ? '0 50px 100px -20px rgba(0,0,0,0.8), 0 30px 60px -30px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}>

          {/* Inner border glow */}
          <div className="absolute inset-0 rounded-2xl border border-purple-500/20" />

          {/* Top section with title */}
          {title && (
            <div className="relative px-4 py-3 border-b border-white/5 bg-black/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">{title}</span>
              </div>
              {subtitle && (
                <p className="text-[10px] text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          )}

          {/* Main content area */}
          <div className="relative p-3">
            {/* Inner frame with wooden effect */}
            <div className="relative rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #2d1f0f 0%, #1a1206 50%, #2d1f0f 100%)',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), inset 0 -2px 10px rgba(255,255,255,0.02)',
              }}>

              {/* Wood grain texture overlay */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(139,69,19,0.1) 2px,
                    rgba(139,69,19,0.1) 4px
                  )`,
                }} />

              {/* Content container */}
              <div className="relative p-2">
                {children}
              </div>
            </div>
          </div>

          {/* Bottom info strip */}
          <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            </div>
            <span className="text-[8px] text-gray-600 font-mono">2025</span>
          </div>

          {/* Glare/Shine effect */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* 3D depth shadow */}
        <div
          className="absolute inset-0 -z-10 rounded-2xl transition-all duration-200"
          style={{
            transform: 'translateZ(-50px)',
            background: 'rgba(0,0,0,0.3)',
            filter: 'blur(20px)',
          }}
        />
      </div>
    </div>
  );
};

// ============================================
// TECH ICONS SVG COMPONENTS
// ============================================
const TechIcons = {
  React: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#61DAFB" d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 0"/>
      <path fill="#61DAFB" d="M12 21.35c-1.1 0-2.13-.09-3.08-.25-2.14-.38-3.77-1.12-4.72-2.12-.5-.53-.8-1.1-.9-1.7-.1-.6.02-1.2.35-1.83.57-1.1 1.7-2.2 3.27-3.18-1.57-.98-2.7-2.08-3.27-3.18-.33-.63-.45-1.23-.35-1.82.1-.6.4-1.18.9-1.7.95-1 2.58-1.75 4.72-2.13.95-.16 1.98-.24 3.08-.24s2.13.08 3.08.24c2.14.38 3.77 1.13 4.72 2.12.5.53.8 1.1.9 1.7.1.6-.02 1.2-.35 1.83-.57 1.1-1.7 2.2-3.27 3.18 1.57.98 2.7 2.08 3.27 3.18.33.63.45 1.23.35 1.82-.1.6-.4 1.18-.9 1.7-.95 1-2.58 1.75-4.72 2.13-.95.16-1.98.25-3.08.25z"/>
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#3178C6" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  NextJS: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#ffffff" d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#339933" d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.283.283 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551l-2.306-1.326a1.85 1.85 0 0 1-.922-1.6V6.921c0-.659.353-1.275.922-1.603l8.795-5.082a1.93 1.93 0 0 1 1.846 0l8.794 5.082c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 0 1-.924 1.601l-8.794 5.078c-.28.163-.6.247-.922.247z"/>
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z"/>
      <path fill="#FFD43B" d="M21.93 8.5l.05.63.13.55.21.46.26.38.3.31.33.25.35.19.35.14.33.1.3.07.26.04.21.02h4.83l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.06h3.17l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23-.06 1.22-.16 1.04-.24.87-.32.71-.36.57-.4.44-.42.33-.42.24-.4.16-.36.1-.32.05-.24.01h-.16l-.06-.01H13.84v.83h6.77l.01 2.75.02.37-.05.34-.11.31-.17.28-.25.26-.31.23-.38.2-.44.18-.51.15-.58.12-.64.1-.71.06-.77.04-.84.02-1.27-.05-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21V8.5zm-6.3 13.34l.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09z"/>
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#F05032" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/>
    </svg>
  ),
  Firebase: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#FFCA28" d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"/>
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#F24E1E" d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51z"/>
      <path fill="#A259FF" d="M8.148 24c2.476 0 4.49-2.014 4.49-4.49v-4.49H8.148c-2.476 0-4.49 2.014-4.49 4.49s2.014 4.49 4.49 4.49zm0-7.51h3.117v5.039c0 1.665-1.355 3.019-3.019 3.019s-3.019-1.355-3.019-3.019 1.355-3.039 2.921-3.039z"/>
      <path fill="#1ABCFE" d="M8.148 15.02h4.588V6h-4.49c-2.476 0-4.49 2.014-4.49 4.49s2.014 4.53 4.392 4.53z"/>
      <path fill="#0ACF83" d="M8.148 8.981c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981H8.148z"/>
      <path fill="#FF7262" d="M15.852 15.02c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49z"/>
    </svg>
  ),
  Vercel: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#ffffff" d="M24 22.525H0l12-21.05 12 21.05z"/>
    </svg>
  ),
  HTML5: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  ),
  CSS3: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
    </svg>
  ),
  Flutter: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#02569B" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
    </svg>
  ),
  AWS: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#FF9900" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586z"/>
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
    </svg>
  ),
  GraphQL: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#E10098" d="M14.051 2.751l4.935 2.85c.816-.859 2.173-.893 3.032-.077.148.14.274.301.377.477.589 1.028.232 2.339-.796 2.928-.174.1-.361.175-.558.223v5.699c1.146.273 1.854 1.423 1.58 2.569-.048.204-.127.4-.232.581-.592 1.023-1.901 1.374-2.927.782-.196-.113-.375-.259-.526-.428l-4.905 2.832c.372 1.124-.238 2.335-1.361 2.706-.217.072-.442.108-.67.107-1.181-.001-2.139-.96-2.138-2.142 0-.199.029-.396.085-.586l-4.937-2.85c-.816.858-2.171.892-3.03.076-.859-.816-.893-2.172-.077-3.03.143-.151.31-.28.494-.383l-.001-5.699c-1.146-.274-1.854-1.423-1.581-2.569.274-1.146 1.423-1.854 2.569-1.581.204.049.399.127.581.232l4.907-2.834c-.372-1.124.238-2.335 1.361-2.706 1.124-.371 2.335.238 2.706 1.361.072.217.108.442.107.67 0 .203-.03.404-.088.598z"/>
    </svg>
  ),
  ThreeJS: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#ffffff" d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0z"/>
    </svg>
  ),
  Blender: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#F5792A" d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 012.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.389 3.389 0 01-2.374.938 3.393 3.393 0 01-2.376-.938c-.58-.567-.91-1.33-.865-2.152"/>
    </svg>
  ),
};

// ============================================
// 3D ICON CLOUD COMPONENT
// ============================================
const techStack = [
  { name: 'React', Icon: TechIcons.React },
  { name: 'TypeScript', Icon: TechIcons.TypeScript },
  { name: 'JavaScript', Icon: TechIcons.JavaScript },
  { name: 'Next.js', Icon: TechIcons.NextJS },
  { name: 'Node.js', Icon: TechIcons.NodeJS },
  { name: 'Python', Icon: TechIcons.Python },
  { name: 'Tailwind', Icon: TechIcons.Tailwind },
  { name: 'Git', Icon: TechIcons.Git },
  { name: 'Docker', Icon: TechIcons.Docker },
  { name: 'Firebase', Icon: TechIcons.Firebase },
  { name: 'Figma', Icon: TechIcons.Figma },
  { name: 'Vercel', Icon: TechIcons.Vercel },
  { name: 'HTML5', Icon: TechIcons.HTML5 },
  { name: 'CSS3', Icon: TechIcons.CSS3 },
  { name: 'Flutter', Icon: TechIcons.Flutter },
  { name: 'MongoDB', Icon: TechIcons.MongoDB },
  { name: 'GraphQL', Icon: TechIcons.GraphQL },
  { name: 'Three.js', Icon: TechIcons.ThreeJS },
];

const IconCloud = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const animationRef = useRef(null);
  const angleRef = useRef(0);

  const positions = useMemo(() => {
    const items = [];
    const numItems = techStack.length;
    const radius = 120;

    for (let i = 0; i < numItems; i++) {
      const phi = Math.acos(-1 + (2 * i) / numItems);
      const theta = Math.sqrt(numItems * Math.PI) * phi;

      items.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        ...techStack[i]
      });
    }
    return items;
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!isHovered) {
        angleRef.current += 0.004;
        setRotation({ x: Math.sin(angleRef.current * 0.5) * 0.1, y: angleRef.current });
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isHovered) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / rect.height;
    const y = (e.clientX - rect.left - rect.width / 2) / rect.width;
    setRotation({ x: x * 0.3, y: y * 0.5 + angleRef.current });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setHoveredIcon(null); }}
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-[250px] h-[250px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}rad) rotateY(${rotation.y}rad)`,
        }}
      >
        {positions.map((item, i) => {
          const scale = (item.z + 150) / 270;
          const opacity = Math.max(0.4, Math.min(1, scale));
          const isActive = hoveredIcon === i;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 transition-all duration-200"
              style={{
                transform: `translate(-50%, -50%) translate3d(${item.x}px, ${item.y}px, ${item.z}px) scale(${isActive ? 1.5 : 1})`,
                opacity: isActive ? 1 : opacity,
                zIndex: isActive ? 1000 : Math.round(item.z + 200),
              }}
              onMouseEnter={() => setHoveredIcon(i)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div
                className={`p-2.5 rounded-xl backdrop-blur-md cursor-pointer transition-all duration-300 border
                  ${isActive ? 'bg-white/20 shadow-[0_0_30px_rgba(139,92,246,0.5)] border-purple-500/50' : 'bg-black/30 border-white/10'}`}
                style={{ width: `${Math.max(36, 42 * scale)}px`, height: `${Math.max(36, 42 * scale)}px` }}
              >
                <item.Icon />
                {isActive && (
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/80 rounded text-[10px] text-white whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

// ============================================
// CLICK RIPPLE EFFECT
// ============================================
const useRipple = () => {
  const [ripples, setRipples] = useState([]);

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
  };

  const RippleContainer = () => (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/40 animate-ripple pointer-events-none"
          style={{ left: ripple.x, top: ripple.y, transform: 'translate(-50%, -50%)' }}
        />
      ))}
    </>
  );

  return { addRipple, RippleContainer };
};

// ============================================
// ANIMATED BACKGROUND
// ============================================
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg className="absolute w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="40" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path filter="url(#glow)" fill="url(#grad1)">
        <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
          M400,300 Q550,150 700,300 Q850,450 700,600 Q550,750 400,600 Q250,450 400,300;
          M450,250 Q650,100 750,350 Q800,500 650,650 Q500,800 350,600 Q200,400 450,250;
          M350,350 Q500,100 700,250 Q900,400 750,600 Q600,800 400,650 Q150,500 350,350;
          M400,300 Q550,150 700,300 Q850,450 700,600 Q550,750 400,600 Q250,450 400,300"/>
      </path>
    </svg>
    {[...Array(15)].map((_, i) => (
      <div key={i} className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${8 + Math.random() * 12}s` }}/>
    ))}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
  </div>
);

// ============================================
// SCROLL REVEAL
// ============================================
const ScrollReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay);
    }, { threshold: 0.1, rootMargin: '-30px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
      {children}
    </div>
  );
};

// ============================================
// BENTO CARD
// ============================================
const BentoCard = ({ children, className = '', hover = true, onClick }) => {
  const { addRipple, RippleContainer } = useRipple();

  return (
    <div
      onClick={(e) => { addRipple(e); onClick?.(e); }}
      className={`relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08]
        ${hover ? 'transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.06] hover:border-purple-500/40 hover:shadow-[0_0_60px_rgba(139,92,246,0.15)] cursor-pointer active:scale-[0.98]' : ''}
        ${className}`}
    >
      <RippleContainer />
      {children}
    </div>
  );
};

// ============================================
// LANGUAGE TOGGLE
// ============================================
const LanguageToggle = ({ lang, setLang }) => {
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'jp' : 'en')}
      className="group relative flex items-center gap-1 px-3 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] hover:border-purple-500/50 transition-all duration-300 overflow-hidden active:scale-95"
    >
      <Globe size={14} className="text-purple-400 mr-1" />
      <div className="relative flex items-center">
        <span
          className={`text-sm font-bold transition-all duration-300 ${
            lang === 'en'
              ? 'text-white scale-110'
              : 'text-gray-500 scale-90'
          }`}
        >
          EN
        </span>
        <span className="text-gray-600 mx-1">/</span>
        <span
          className={`text-sm font-bold transition-all duration-300 ${
            lang === 'jp'
              ? 'text-white scale-110'
              : 'text-gray-500 scale-90'
          }`}
        >
          JP
        </span>
      </div>
      {/* Animated underline */}
      <div
        className="absolute bottom-1.5 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-300"
        style={{
          width: '20px',
          left: lang === 'en' ? '32px' : '58px',
        }}
      />
    </button>
  );
};

// ============================================
// NAVIGATION
// ============================================
const Navigation = ({ lang, setLang, t, scrolled }) => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.05]' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">ZZH</div>
        <div className="hidden md:flex items-center gap-8">
          {[{ key: 'work', id: 'projects' }, { key: 'about', id: 'about' }, { key: 'contact', id: 'connect' }].map(({ key, id }) => (
            <button key={key} onClick={() => scrollTo(id)} className="relative text-gray-400 hover:text-white transition-colors group active:scale-95">
              {t.nav[key]}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>
        <LanguageToggle lang={lang} setLang={setLang} />
      </div>
    </nav>
  );
};

// ============================================
// HERO SECTION WITH 3D CARD
// ============================================
const HeroSection = ({ t, scrollY }) => {
  const { addRipple, RippleContainer } = useRipple();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div style={{ transform: `translateY(${scrollY * 0.15}px)`, opacity: 1 - scrollY / 1200 }}>
            <ScrollReveal delay={0}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.1] mb-8">
                <Sparkles size={16} className="text-purple-400" />
                <span className="text-sm text-gray-300">{t.hero.greeting}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">{t.hero.name}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-light mb-6">{t.hero.role}</p>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <p className="text-base sm:text-lg text-gray-500 max-w-xl mb-10">{t.hero.description}</p>
            </ScrollReveal>

            <ScrollReveal delay={800}>
              <button
                onClick={(e) => { addRipple(e); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] active:scale-95 hover:scale-105"
              >
                <RippleContainer />
                <span className="relative z-10">{t.hero.cta}</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              </button>
            </ScrollReveal>
          </div>

          {/* 3D Card with Photo */}
          <ScrollReveal delay={400} className="flex justify-center lg:justify-end pt-20 lg:pt-0">
            <Card3D badge={true} title="ZAWE ZAW HTET" subtitle="IT Student • Japan">
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-lg overflow-hidden">
                {/* Photo with gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-black to-cyan-900/60" />

                <img
                  src="/images/hero.png"
                  alt="ZAWE ZAW HTET"
                  className="relative z-10 w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Fallback avatar if no image */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div className="text-6xl">👨‍💻</div>
                </div>

                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />

                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-purple-500/50 z-30" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50 z-30" />

                {/* Badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-30">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <p className="text-white font-bold text-sm">Cloud & Business Systems</p>
                    <p className="text-gray-400 text-xs mt-1">IT Student</p>
                  </div>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs text-gray-500">{t.hero.scroll}</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-purple-400 rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

// ============================================
// BENTO GRID SECTION
// ============================================
const BentoSection = ({ t }) => {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* About Card with 3D Photo Card */}
          <ScrollReveal delay={0} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <BentoCard className="h-full p-0 overflow-hidden" hover={false}>
              <div className="flex flex-col lg:flex-row h-full">
                {/* 3D Card Photo */}
                <div className="relative lg:w-2/5 p-4 flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20">
                  <Card3D title="ABOUT" subtitle="Student • Creator">
                    <div className="relative w-44 h-52 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-black to-purple-900/60" />
                      <img
                        src="/images/about.png"
                        alt="ZAWE ZAW HTET"
                        className="relative z-10 w-full h-full object-cover object-center"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="text-5xl">👨‍💻</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
                    </div>
                  </Card3D>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
                      <User className="text-purple-400" size={20} />
                    </div>
                    <h2 className="text-xl font-semibold text-white">{t.about.title}</h2>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{t.about.bio}</p>
                </div>
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* Status Card */}
          <ScrollReveal delay={100}>
            <BentoCard className="p-6 h-full min-h-[160px]">
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  </div>
                  <span className="text-sm text-green-400">{t.about.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-white text-lg font-medium">{t.about.location}</p>
                    <p className="text-gray-500 text-sm">🇯🇵</p>
                  </div>
                </div>
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* How I Use AI Card */}
          <ScrollReveal delay={200}>
            <BentoCard className="p-6 h-full min-h-[160px]">
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <Bot className="text-cyan-400" size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{t.aiUsage.title}</h3>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{t.aiUsage.description}</p>
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* How I Think (Workflow) Card */}
          <ScrollReveal delay={300} className="md:col-span-2">
            <BentoCard className="p-6 h-full" hover={false}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Lightbulb className="text-amber-400" size={18} />
                </div>
                <h3 className="text-lg font-semibold text-white">{t.workflow.title}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.workflow.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* Outside of Code Card */}
          <ScrollReveal delay={400} className="md:col-span-2 lg:col-span-4">
            <BentoCard className="p-6 h-full" hover={false}>
              <h3 className="text-lg font-semibold text-white mb-4">{t.outsideCode.title}</h3>
              <div className="grid grid-cols-3 gap-4">
                {t.outsideCode.items.map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 transition-colors">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="text-white text-base font-medium mb-1">{item.label}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* Tech Stack Card */}
          <ScrollReveal delay={500} className="md:col-span-2 lg:col-span-4">
            <BentoCard className="p-4 h-full overflow-hidden" hover={false}>
              <h3 className="text-xl font-semibold text-white mb-0 px-4 pt-2">{t.tech.title}</h3>
              <IconCloud />
            </BentoCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 3D VISUALIZATION SECTION
// Purpose: Demonstrate 3D understanding with business context
// ============================================
const VisualizationSection = ({ t, lang }) => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Box size={16} className="text-purple-400" />
              <span className="text-sm text-purple-300">3D Visualization</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t.visualization.title}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t.visualization.subtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
            <Suspense fallback={
              <div className="w-full h-[400px] flex items-center justify-center bg-black/40">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-500 text-sm">Loading 3D visualization...</span>
                </div>
              </div>
            }>
              <TechVisualization lang={lang} />
            </Suspense>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ============================================
// PROJECTS SECTION
// ============================================
const ProjectsSection = ({ t }) => {
  const gradients = ['from-purple-600 via-pink-600 to-red-500', 'from-cyan-500 via-blue-600 to-purple-600', 'from-orange-500 via-red-500 to-pink-600'];

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t.projects.title}</h2>
          <p className="text-gray-500 flex items-center gap-2">
            <MousePointer2 size={16} className="animate-bounce" />
            {t.projects.subtitle}
          </p>
        </ScrollReveal>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 px-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        <div className="flex-shrink-0 w-[calc((100vw-1280px)/2)]" />

        {t.projects.items.map((project, i) => (
          <ScrollReveal key={i} delay={i * 200} className="flex-shrink-0 snap-center">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[85vw] md:w-[500px] lg:w-[600px] h-[480px] md:h-[520px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-80 group-hover:opacity-100 transition-opacity`} />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

              <div className="absolute top-8 right-8 w-24 h-24 border-2 border-white/30 rounded-2xl rotate-12 group-hover:rotate-[135deg] transition-all duration-1000" />
              <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full group-hover:scale-[3] group-hover:opacity-0 transition-all duration-700" />

              {/* GitHub Icon Badge */}
              <div className="absolute top-6 left-6 p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <Github size={20} className="text-white" />
              </div>

              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h3>

                  {/* Problem & Solution */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-black/30 flex items-center justify-center mt-0.5">
                        <AlertCircle size={12} className="text-red-300" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-200 mb-0.5">{t.projects.problemLabel}</p>
                        <p className="text-sm text-white/80 leading-relaxed">{project.problem}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-black/30 flex items-center justify-center mt-0.5">
                        <CheckCircle size={12} className="text-green-300" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-200 mb-0.5">{t.projects.solutionLabel}</p>
                        <p className="text-sm text-white/80 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-sm rounded-full bg-black/20 text-white/90 backdrop-blur-sm border border-white/10">{tag}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {t.projects.view}
                    <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </a>
          </ScrollReveal>
        ))}

        <div className="flex-shrink-0 w-[calc((100vw-1280px)/2)]" />
      </div>
    </section>
  );
};

// ============================================
// CONNECT SECTION
// ============================================
const ConnectSection = ({ t }) => {
  const { addRipple, RippleContainer } = useRipple();
  const links = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Z200-WEB', color: 'hover:border-gray-400 hover:bg-gray-500/20' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/zawe-zaw-htet-266ba13a9', color: 'hover:border-blue-400 hover:bg-blue-500/20' },
    { name: 'Email', icon: Mail, href: 'mailto:doomsday77923@gmail.com', color: 'hover:border-purple-400 hover:bg-purple-500/20' },
  ];

  return (
    <section id="connect" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t.connect.title}</h2>
          <p className="text-gray-500 text-lg mb-12">{t.connect.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={addRipple}
                className={`group relative flex items-center justify-center gap-4 px-8 py-5 rounded-2xl border border-white/[0.1] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 overflow-hidden active:scale-95 hover:scale-105 ${link.color}`}
              >
                <RippleContainer />
                <link.icon className="text-white group-hover:scale-125 transition-all" size={24} />
                <span className="text-white font-medium text-lg">{link.name}</span>
                <ArrowRight size={18} className="text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all" />
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [lang, setLang] = useState('en');
  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes ripple {
          0% { width: 0; height: 0; opacity: 0.6; }
          100% { width: 600px; height: 600px; opacity: 0; }
        }
        @keyframes scroll-down {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-ripple { animation: ripple 0.8s ease-out forwards; }
        .animate-scroll-down { animation: scroll-down 1.5s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(139, 92, 246, 0.4); color: white; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #030303; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #7c3aed, #06b6d4); border-radius: 3px; }
      `}</style>

      <Navigation lang={lang} setLang={setLang} t={t} scrolled={scrolled} />
      <HeroSection t={t} scrollY={scrollY} />
      <BentoSection t={t} />
      <VisualizationSection t={t} lang={lang} />
      <ProjectsSection t={t} />
      <ConnectSection t={t} />

      <footer className="py-8 text-center border-t border-white/[0.05]">
        <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
          © 2025 ZAWE ZAW HTET. {t.footer}
          <Heart size={14} className="text-pink-500 animate-pulse" />
        </p>
      </footer>
    </div>
  );
}
