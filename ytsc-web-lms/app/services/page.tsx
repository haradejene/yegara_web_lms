import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ArrowRightIcon,
  SparklesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-gradient-to-br from-[#2563eb] to-[#1e40af]">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#dc2626]/10 rounded-full blur-3xl"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container-custom px-6 md:px-8 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 mb-8">
              <SparklesIcon className="w-5 h-5 text-[#dc2626]" />
              <span className="text-sm font-medium text-white tracking-wider">OUR SERVICES</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white font-eina-bold leading-tight">
              Our Services
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions designed for shareholder success and growth
            </p>
          </div>
        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section className="py-28 bg-white">
        <div className="container-custom px-6 md:px-8 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                {/* Icon with gradient background */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#dc2626] opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                  <div className="w-20 h-20 bg-[#2563eb]/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-10 h-10 text-[#2563eb] group-hover:text-[#dc2626] transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-[#2563eb] mb-4 group-hover:text-[#dc2626] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <p className="text-sm font-amharic text-[#dc2626] mb-8 pb-6 border-b border-gray-100">
                  {service.amharic}
                </p>

                {/* Link */}
                <Link 
                  href={service.link} 
                  className="inline-flex items-center gap-3 text-[#2563eb] font-semibold hover:text-[#dc2626] transition-colors group/link text-base"
                >
                  Learn More
                  <ArrowRightIcon className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-28 bg-gray-50">
        <div className="container-custom px-6 md:px-8 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2563eb] mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 text-center group">
                  <div className="w-20 h-20 bg-[#2563eb]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#dc2626] transition-colors duration-300">
                    <Icon className="w-10 h-10 text-[#2563eb] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2563eb] mb-4 group-hover:text-[#dc2626] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ HIGHLIGHTS ============ */}
      <section className="py-28 bg-white">
        <div className="container-custom px-6 md:px-8 mx-auto">
          <div className="bg-gradient-to-br from-[#2563eb] to-[#1e40af] rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-6">Service Highlights</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Our platform has helped thousands of shareholders achieve their learning goals and advance their careers.
                </p>
                <Link 
                  href="/register"
                  className="inline-flex items-center gap-3 bg-[#dc2626] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#b91c1c] transition-all duration-300 hover:-translate-y-1 shadow-xl"
                >
                  Get Started
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>
              <div className="space-y-6">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-white/20 pb-6 last:border-0 last:pb-0">
                    <span className="text-white/80 text-lg">{item.label}</span>
                    <span className="text-3xl font-bold text-[#dc2626]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-28 bg-gradient-to-br from-[#2563eb] to-[#1e40af] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#dc2626]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[25rem] h-[25rem] bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="container-custom px-6 md:px-8 mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white font-eina-bold leading-tight">
            <span className="block mb-4">Ready to Get Started?</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-amharic text-[#dc2626]">ዛሬውኑ ይመዝገቡ</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-white/80">
            Join our community of shareholders and access exclusive training and resources
          </p>
          
          <Link 
            href="/register" 
            className="group inline-flex items-center gap-3 bg-[#dc2626] text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-[#b91c1c] transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
          >
            Register Now
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    icon: AcademicCapIcon,
    title: 'Digital Learning Platform',
    description: 'Access comprehensive training modules and courses designed for shareholders',
    amharic: 'ዲጂታል የትምህርት መድረክ',
    link: '/courses'
  },
  {
    icon: VideoCameraIcon,
    title: 'Video Training',
    description: 'Engaging video content covering essential topics and skills',
    amharic: 'ቪዲዮ ስልጠና',
    link: '/courses?type=video'
  },
  {
    icon: DocumentTextIcon,
    title: 'Resource Library',
    description: 'Extensive collection of PDFs, documents, and learning materials',
    amharic: 'የመረጃ ቤተ-መዘክር',
    link: '/resources'
  },
  {
    icon: UserGroupIcon,
    title: 'Shareholder Network',
    description: 'Connect with fellow shareholders and industry experts',
    amharic: 'የባለአክሲዮኖች መረብ',
    link: '/community'
  },
  {
    icon: ChartBarIcon,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics',
    amharic: 'የእድገት ክትትል',
    link: '/lms/dashboard'
  },
  {
    icon: BookOpenIcon,
    title: 'Certification Programs',
    description: 'Earn certificates upon course completion',
    amharic: 'የምስክር ወረቀት ፕሮግራሞች',
    link: '/certificates'
  }
]

const whyChooseUs = [
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security',
    description: 'Your data and progress are protected with the highest security standards and encryption.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Access',
    description: 'Access your learning materials anytime, anywhere, on any device with internet connection.'
  },
  {
    icon: AcademicCapIcon,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of practical experience and expertise.'
  }
]

const highlights = [
  { label: 'Active Users', value: '500+' },
  { label: 'Courses Available', value: '50+' },
  { label: 'Success Rate', value: '95%' },
  { label: 'Support Response', value: '24/7' }
]