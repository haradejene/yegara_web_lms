import Image from 'next/image'
import Link from 'next/link'
import { 
  ShieldCheckIcon, 
  LightBulbIcon, 
  GlobeAltIcon, 
  ChartBarIcon,
  SparklesIcon,
  ArrowRightIcon,
  UsersIcon,
  RocketLaunchIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'

export default function AboutPage() {
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
              <span className="text-sm font-medium text-white tracking-wider">ABOUT YTSC</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white font-eina-bold leading-tight">
              <span className="block mb-4">ስለ የገራ ንግድ ማህበር</span>
              <span className="block text-3xl md:text-4xl lg:text-5xl text-[#dc2626]">
                YEGARA TRADING SHARE COMPANY
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Empowering Shareholders Through Innovation and Digital Transformation Since 2010
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#dc2626] mb-2">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="py-28 bg-white">
        <div className="container-custom px-6 md:px-8 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Mission Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#dc2626]/5 rounded-full -translate-y-24 translate-x-24 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="p-10 lg:p-12 relative z-10">
                <div className="w-20 h-20 bg-[#2563eb]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#dc2626] transition-colors duration-300">
                  <RocketLaunchIcon className="w-10 h-10 text-[#2563eb] group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2563eb] mb-6">Our Mission</h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  To empower our shareholders with modern digital tools, comprehensive training, 
                  and resources that drive success in Ethiopia's evolving economic landscape.
                </p>
                
                <div className="bg-[#dc2626]/5 p-8 rounded-2xl border border-[#dc2626]/10">
                  <p className="font-amharic text-[#dc2626] text-xl leading-relaxed">
                    የኛ ተልዕኖ ባለአክሲዮኖቻችንን በዘመናዊ ዲጂታል መሳሪያዎች፣ አጠቃላይ ስልጠና እና ሀብቶች ማብቃት ነው።
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#dc2626]/5 rounded-full -translate-y-24 translate-x-24 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="p-10 lg:p-12 relative z-10">
                <div className="w-20 h-20 bg-[#2563eb]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#dc2626] transition-colors duration-300">
                  <GlobeAltIcon className="w-10 h-10 text-[#2563eb] group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2563eb] mb-6">Our Vision</h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  To be Ethiopia's leading digital ecosystem for shareholder engagement, 
                  education, and sustainable growth.
                </p>
                
                <div className="bg-[#dc2626]/5 p-8 rounded-2xl border border-[#dc2626]/10">
                  <p className="font-amharic text-[#dc2626] text-xl leading-relaxed">
                    የኛ ራዕይ በኢትዮጵያ ውስጥ ለባለአክሲዮኖች ተሳትፎ፣ ትምህርት እና ቀጣይነት ያለው እድገት መሪ ዲጂታል ስርዓት መሆን ነው።
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OUR STORY ============ */}
      <section className="py-28 bg-gray-50">
        <div className="container-custom px-6 md:px-8 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            {/* Left side - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#dc2626]/10 px-5 py-2.5 rounded-full">
                <SparklesIcon className="w-5 h-5 text-[#dc2626]" />
                <span className="text-sm font-medium text-[#dc2626] tracking-wider">OUR JOURNEY</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-[#2563eb] leading-tight">
                Building Ethiopia's Premier Shareholder Platform
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                Founded with a vision to transform how shareholders engage with their investments, 
                YTSC has grown to become a trusted partner for thousands of investors across Ethiopia.
              </p>

              <div className="space-y-6 pt-6">
                {milestones.map((item, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="w-12 h-12 bg-[#dc2626] rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2563eb] mb-2">{item.year}</h3>
                      <p className="text-gray-600 text-base">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Stats Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#2563eb] to-[#1e40af] rounded-3xl p-10 lg:p-12 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-8">Our Impact</h3>
                <div className="space-y-8">
                  {impact.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-white/20 pb-6 last:border-0 last:pb-0">
                      <span className="text-white/80 text-lg">{item.label}</span>
                      <span className="text-3xl font-bold text-[#dc2626]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#dc2626]/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 -left-8 w-56 h-56 bg-[#2563eb]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section className="py-28 bg-white">
        <div className="container-custom px-6 md:px-8 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2563eb] mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 text-center"
                >
                  <div className="relative mb-8 inline-block">
                    <div className="absolute inset-0 bg-[#dc2626] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                    <div className="w-24 h-24 bg-[#2563eb]/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <Icon className="w-12 h-12 text-[#2563eb] group-hover:text-[#dc2626] transition-colors duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#2563eb] mb-4 group-hover:text-[#dc2626] transition-colors duration-300">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TEAM SECTION ============ */}
      <section className="py-28 bg-gray-50">
        <div className="container-custom px-6 md:px-8 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2563eb] mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-8 inline-block">
                  <div className="w-40 h-40 bg-gradient-to-br from-[#2563eb] to-[#1e40af] rounded-3xl flex items-center justify-center text-white text-5xl font-bold mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    {member.avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#dc2626] rounded-xl flex items-center justify-center text-white text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                    {member.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#2563eb] mb-2">{member.name}</h3>
                <p className="text-[#dc2626] font-medium mb-3">{member.position}</p>
                <p className="text-sm text-gray-600 leading-relaxed px-4">{member.description}</p>
              </div>
            ))}
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
            <span className="block mb-4">Join Our Community</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-amharic text-[#dc2626]">ዛሬውኑ ይቀላቀሉ</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-white/80">
            Become part of Ethiopia's leading shareholder platform and access exclusive benefits
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/register" 
              className="group inline-flex items-center gap-3 bg-[#dc2626] text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-[#b91c1c] transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              Get Started Today
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#2563eb] transition-all duration-300 hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const stats = [
  { value: '15+', label: 'Years' },
  { value: '5000+', label: 'Shareholders' },
  { value: '50+', label: 'Courses' },
  { value: '95%', label: 'Satisfaction' }
]

const milestones = [
  {
    year: '2010',
    description: 'YTSC was founded with a vision to transform shareholder engagement'
  },
  {
    year: '2015',
    description: 'Expanded services to include digital training and resources'
  },
  {
    year: '2020',
    description: 'Launched comprehensive LMS platform for shareholders'
  },
  {
    year: '2024',
    description: 'Reached 5000+ active shareholders milestone'
  }
]

const impact = [
  { label: 'Training Hours', value: '10,000+' },
  { label: 'Courses Completed', value: '25,000+' },
  { label: 'Certificates Issued', value: '15,000+' },
  { label: 'Active Users', value: '3,500+' }
]

const values = [
  {
    icon: ShieldCheckIcon,
    title: 'Integrity',
    description: 'Operating with transparency and ethical practices in everything we do'
  },
  {
    icon: LightBulbIcon,
    title: 'Innovation',
    description: 'Embracing digital transformation and new ideas to serve better'
  },
  {
    icon: UsersIcon,
    title: 'Community',
    description: 'Building strong shareholder relationships based on trust'
  },
  {
    icon: ChartBarIcon,
    title: 'Growth',
    description: 'Fostering continuous improvement and sustainable success'
  }
]

const team = [
  {
    name: 'Abebe Kebede',
    position: 'CEO & Founder',
    description: '15+ years in financial services and digital transformation',
    avatar: 'AK',
    icon: '⭐'
  },
  {
    name: 'Tigist Haile',
    position: 'Chief Operating Officer',
    description: 'Expert in operations and shareholder relations',
    avatar: 'TH',
    icon: '⭐'
  },
  {
    name: 'Solomon Desta',
    position: 'Head of Digital Learning',
    description: 'EdTech specialist with international experience',
    avatar: 'SD',
    icon: '⭐'
  },
  {
    name: 'Meron Assefa',
    position: 'Shareholder Relations',
    description: 'Dedicated to exceptional member experiences',
    avatar: 'MA',
    icon: '⭐'
  }
]