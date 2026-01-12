import React from 'react';
import { ArrowRight, Activity, Shield, Heart, Brain, Users, Globe, Sparkles, Stethoscope, MessageSquare } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface LandingPageProps {
    onAuth: (type: 'signin' | 'signup') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuth }) => {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;
    const heroConsultationFallback = `${import.meta.env.BASE_URL}hero-consultation.svg`;
    const heroInclusiveFallback = `${import.meta.env.BASE_URL}hero-inclusive.svg`;

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

            {/* Hero Section */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-transparent to-purple-600/20 z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Copy + CTAs */}
                        <div className="text-center lg:text-left">
                            <div className="flex justify-center lg:justify-start mb-6">
                                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md shadow-xl ring-1 ring-white/50 inline-flex items-center gap-3">
                                    <img src={logoSrc} alt="Global CareNest" className="h-14 w-14 shrink-0" />
                                    <div className="text-left">
                                        <p className="text-xs uppercase tracking-widest text-gray-700/80 dark:text-gray-200/80">Accessible healthcare</p>
                                        <p className="font-bold text-lg">Global CareNest</p>
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                                Care that understands you.
                                <span className="block pb-1 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">Anytime. Anywhere.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                                A human-centered healthcare ecosystem built for <span className="text-teal-500 font-bold">dignity</span>,
                                <span className="text-purple-500 font-bold"> inclusion</span>, and <span className="text-blue-500 font-bold"> continuity</span> —
                                empowering deaf and non-verbal individuals with AI-assisted communication.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                                <MiniPill icon={<MessageSquare className="h-4 w-4" />} label="Sign-to-voice support" />
                                <MiniPill icon={<Shield className="h-4 w-4" />} label="Secure health identity" />
                                <MiniPill icon={<Stethoscope className="h-4 w-4" />} label="Smarter consultations" />
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                                <button
                                    onClick={() => onAuth('signup')}
                                    className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    Get Started <ArrowRight className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => onAuth('signin')}
                                    className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-lg shadow-sm transition-all"
                                >
                                    Log In
                                </button>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60">
                                    <Sparkles className="h-4 w-4 text-purple-400" />
                                    Built for accessibility
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60">
                                    <Heart className="h-4 w-4 text-red-400" />
                                    Human-first design
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60">
                                    <Globe className="h-4 w-4 text-green-400" />
                                    Global-ready
                                </span>
                            </div>
                        </div>

                        {/* Right: Visual (SVG + images) */}
                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-br from-teal-500/10 to-purple-600/10 rounded-3xl blur-2xl"></div>

                            <div className="relative bg-white/70 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700/60 rounded-3xl p-6 backdrop-blur-md shadow-xl">
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Accessible Consultation</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">AI interpreter + live captions</p>
                                    </div>
                                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-600/10 text-teal-700 dark:text-teal-300 border border-teal-600/20">
                                        Live
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-4 items-stretch">
                                    <div className="col-span-12 sm:col-span-7 rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-700/60 bg-gray-100 dark:bg-gray-900/40">
                                        <img
                                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1b?auto=format&fit=crop&w=1200&q=80"
                                            alt="Doctor consultation"
                                            className="w-full h-48 sm:h-56 object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.src = heroConsultationFallback;
                                            }}
                                        />
                                        <div className="p-4">
                                            <p className="text-sm font-semibold">Clear communication</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300">Designed for deaf and non-verbal users.</p>
                                        </div>
                                    </div>

                                    <div className="col-span-12 sm:col-span-5 rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-700/60 bg-gray-100 dark:bg-gray-900/40">
                                        <div className="p-4">
                                            <p className="text-sm font-semibold mb-2">Care Map</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">Your data stays connected across visits.</p>
                                            <RightIllustration />
                                        </div>
                                    </div>

                                    <div className="col-span-12 rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-700/60 bg-gray-100 dark:bg-gray-900/40">
                                        <img
                                            src="https://images.unsplash.com/photo-1580281657527-47f249e8f2f2?auto=format&fit=crop&w=1200&q=80"
                                            alt="Inclusive healthcare support"
                                            className="w-full h-32 object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.src = heroInclusiveFallback;
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Quick Stats */}
            <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard title="Inclusive by design" value="Accessibility-first" subtitle="Built around real needs" />
                    <StatCard title="Secure by default" value="Privacy-focused" subtitle="Safer data handling" />
                    <StatCard title="Guided journeys" value="Continuous care" subtitle="Across moments and places" />
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <h2 className="text-3xl font-bold text-center mb-16">Why Global CareNest?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    <FeatureCard
                        icon={<Brain className="h-8 w-8 text-teal-400" />}
                        title="AI Sign Language Interpreter"
                        description="Real-time 3D avatar translation for seamless communication between patients and providers."
                    />
                    <FeatureCard
                        icon={<Shield className="h-8 w-8 text-purple-400" />}
                        title="Secure Health Identity"
                        description="A living health narrative that stays with you, ensuring continuity of care across institutions."
                    />
                    <FeatureCard
                        icon={<Activity className="h-8 w-8 text-blue-400" />}
                        title="Proactive Monitoring"
                        description="Early detection of health trends to prevent emergencies before they happen."
                    />
                    <FeatureCard
                        icon={<Heart className="h-8 w-8 text-red-400" />}
                        title="Community & Dignity"
                        description="Built on communication equity, ensuring no one is marginalized due to ability."
                    />
                    <FeatureCard
                        icon={<Users className="h-8 w-8 text-orange-400" />}
                        title="Family & Caregivers"
                        description="Integrated support network allowing families to participate meaningfully in care."
                    />
                    <FeatureCard
                        icon={<Globe className="h-8 w-8 text-green-400" />}
                        title="Universal Access"
                        description="Designed from the ground up to be accessible, adaptive, and culturally sensitive."
                    />

                </div>
            </section>

            {/* How it works */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-10">
                    <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                        A simple flow that keeps care understandable, continuous, and accessible.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StepCard
                            step="01"
                            title="Create your profile"
                            description="Set up your health identity so your context is never lost."
                            icon={<Users className="h-5 w-5 text-teal-400" />}
                        />
                        <StepCard
                            step="02"
                            title="Communicate clearly"
                            description="Use AI-assisted interpretation and captions during consultations."
                            icon={<MessageSquare className="h-5 w-5 text-purple-400" />}
                        />
                        <StepCard
                            step="03"
                            title="Track and improve"
                            description="Monitor wellness signals and access resources that fit your needs."
                            icon={<Activity className="h-5 w-5 text-blue-400" />}
                        />
                    </div>
                </div>
            </section>

            {/* Footer Preview */}
            <footer className="py-10 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-gray-800 mt-auto">
                <p>© 2026 Global CareNest. All rights reserved.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform duration-300">
        <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
        </p>
    </div>
);

const MiniPill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center justify-center lg:justify-start gap-2 px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60">
        <span className="text-teal-500">{icon}</span>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</span>
    </div>
);

const StatCard = ({ title, value, subtitle }: { title: string; value: string; subtitle: string }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-xl font-extrabold mt-2">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>
    </div>
);

const StepCard = ({
    step,
    title,
    description,
    icon,
}: {
    step: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}) => (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 p-6">
        <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                {icon}
            </div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{step}</span>
        </div>
        <p className="font-bold text-lg mb-2">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
);

const RightIllustration = () => (
    <svg
        viewBox="0 0 320 240"
        className="w-full h-40"
        role="img"
        aria-label="Care map illustration"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgb(45 212 191)" stopOpacity="0.35" />
                <stop offset="1" stopColor="rgb(168 85 247)" stopOpacity="0.35" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="320" height="240" rx="20" fill="url(#g)" />
        <g fill="none" stroke="rgb(148 163 184)" strokeOpacity="0.55" strokeWidth="2">
            <path d="M36 70 C 90 20, 150 20, 200 70" />
            <path d="M120 170 C 170 120, 230 120, 284 170" />
            <path d="M70 120 C 120 90, 200 90, 250 120" />
        </g>
        <g>
            <circle cx="48" cy="78" r="10" fill="rgb(20 184 166)" fillOpacity="0.85" />
            <circle cx="200" cy="70" r="10" fill="rgb(168 85 247)" fillOpacity="0.85" />
            <circle cx="120" cy="170" r="10" fill="rgb(59 130 246)" fillOpacity="0.85" />
            <circle cx="284" cy="170" r="10" fill="rgb(20 184 166)" fillOpacity="0.85" />
            <circle cx="250" cy="120" r="10" fill="rgb(168 85 247)" fillOpacity="0.85" />
            <circle cx="70" cy="120" r="10" fill="rgb(59 130 246)" fillOpacity="0.85" />
        </g>
        <g fill="rgb(15 23 42)" fillOpacity="0.8">
            <rect x="26" y="188" width="268" height="26" rx="13" fill="rgb(255 255 255)" fillOpacity="0.75" />
        </g>
        <g fill="rgb(15 23 42)" fillOpacity="0.75">
            <text x="40" y="206" fontSize="12" fontFamily="ui-sans-serif, system-ui">Connected visits • Shared context • Better outcomes</text>
        </g>
    </svg>
);

export default LandingPage;
