import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import { 
  ArrowRightIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default async function HomePage() {
  const supabase = await createSupabaseServerClient()
  
  const { data: featuredCourses } = await supabase
    .from('courses')
    .select('*')
    .limit(3)

  return (
    <div className="min-h-screen">
      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with modern overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/90 via-[#2563eb]/80 to-[#1e40af]/90 z-10"></div>
          <Image
            src="/images/hero-bg.jpg"
            alt="Yegara Trading Share Company"
            fill
            className="object-cover"
            priority
          />
          {/* Modern geometric pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container-custom px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8 animate-fadeInUp">
              <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide">WELCOME TO YTSC</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-eina-bold animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <span className="block mb-4 text-white">የገራ ንግድ ማህበር</span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-amharic text-[#dc2626]">
                YEGARA TRADING SHARE COMPANY
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl lg:text-2xl mb-6 max-w-3xl mx-auto text-white/90 font-amharic leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              ለባለአክሲዮኖቻችን ዘመናዊ የዲጂታል ትምህርት እና ሀብት
            </p>
            
            <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-white/80 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              Empowering our shareholders with modern digital education, resources, and training programs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link 
                href="/register" 
                className="group relative inline-flex items-center gap-3 bg-[#dc2626] text-white px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-3">
                  Join as Shareholder
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="/courses" 
                className="group relative inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden hover:bg-white hover:text-[#2563eb] transition-all duration-300 hover:-translate-y-1"
              >
                Explore Courses
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

              {/* Floating Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 mt-20">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#dc2626] mb-2">500+</div>
                <div className="text-base text-white font-medium">Active Shareholders</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#dc2626] mb-2">50+</div>
                <div className="text-base text-white font-medium">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#dc2626] mb-2">95%</div>
                <div className="text-base text-white font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#dc2626] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-24 bg-white">
        <div className="container-custom px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">
              <span className="block font-amharic text-2xl mb-3 text-[#dc2626]">አገልግሎቶቻችን</span>
              <span className="block text-3xl md:text-4xl text-[#2563eb]">Our Services</span>
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto mt-6">
              Comprehensive solutions designed for shareholder success and growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-[#2563eb]/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#dc2626] transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-[#2563eb] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#2563eb] mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <p className="text-sm font-amharic text-[#dc2626]">{feature.amharic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LMS INTEGRATION SECTION ============ */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="section-title">
                <span className="block font-amharic text-2xl mb-3 text-[#dc2626]">የዲጂታል ትምህርት መድረክ</span>
                <span className="block text-3xl md:text-4xl text-[#2563eb]">Shareholder Learning Portal</span>
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Access exclusive training materials, courses, and resources designed specifically for YTSC shareholders. Track your progress, earn certificates, and stay ahead in today's competitive landscape.
              </p>

              <div className="space-y-5">
                {lmsFeatures.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#dc2626] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2563eb]">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <Link 
                  href="/lms" 
                  className="group inline-flex items-center gap-3 bg-[#dc2626] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#b91c1c] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Access Portal
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/courses" 
                  className="group inline-flex items-center gap-3 border-2 border-[#2563eb] text-[#2563eb] px-6 py-3 rounded-xl font-semibold hover:bg-[#2563eb] hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  Browse Courses
                </Link>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#2563eb] to-[#dc2626] rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-3xl p-8">
                  {/* Preview Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#2563eb] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">YTSC</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2563eb] text-lg">Shareholder Dashboard</h3>
                      <p className="text-sm text-gray-500">Your learning progress</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Course Progress</span>
                      <span className="text-[#dc2626] font-bold">68%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className="bg-[#dc2626] rounded-full h-3" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-[#2563eb]">5</div>
                      <div className="text-sm text-gray-600">Active Courses</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-[#2563eb]">3</div>
                      <div className="text-sm text-gray-600">Certificates</div>
                    </div>
                  </div>

                  {/* Course List Preview */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2563eb]/10 rounded-lg flex items-center justify-center">
                        <BookOpenIcon className="w-5 h-5 text-[#2563eb]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Digital Transformation</div>
                        <div className="text-xs text-gray-500">2/5 lessons completed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#dc2626]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#2563eb]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED COURSES ============ */}
      {featuredCourses && featuredCourses.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container-custom px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title text-center">
                <span className="block font-amharic text-2xl mb-3 text-[#dc2626]">ታዋቂ ኮርሶች</span>
                <span className="block text-3xl md:text-4xl text-[#2563eb]">Featured Training Programs</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
                Start your learning journey with our top courses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <div key={course.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-52 bg-gray-100">
                    {course.thumbnail_url ? (
                      <Image 
                        src={course.thumbnail_url} 
                        alt={course.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpenIcon className="w-20 h-20 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-[#dc2626] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {course.content_type === 'video' ? '🎥 Video Course' : '📄 PDF Document'}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="font-bold text-[#2563eb] text-xl mb-3 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/courses/${course.id}`}
                        className="inline-flex items-center gap-2 text-[#dc2626] font-semibold hover:text-[#b91c1c] transition-colors group"
                      >
                        Learn More 
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      
                      <span className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 50) + 10} students
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link 
                href="/courses" 
                className="inline-flex items-center gap-3 border-2 border-[#2563eb] text-[#2563eb] px-8 py-4 rounded-xl font-semibold hover:bg-[#2563eb] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                View All Courses
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============ STATS SECTION ============ */}
      <section className="py-24 bg-[#2563eb]">
        <div className="container-custom px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-[#dc2626] mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-white/80 mb-2">{stat.label}</div>
                <div className="text-xs font-amharic text-white/60">{stat.amharic}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">
              <span className="block font-amharic text-2xl mb-3 text-[#dc2626]">ምስክርነቶች</span>
              <span className="block text-3xl md:text-4xl text-[#2563eb]">What Our Shareholders Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                <div className="absolute top-6 right-6 text-7xl text-[#dc2626]/10 font-serif">"</div>
                <p className="text-gray-600 mb-8 relative z-10 italic">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#2563eb]/10 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2563eb]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-24 bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white">
        <div className="container-custom px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-eina-bold">
            <span className="block font-amharic text-2xl md:text-3xl mb-4 text-[#dc2626]">ዛሬውኑ ይመዝገቡ</span>
            <span className="block">Ready to Start Your Journey?</span>
          </h2>
          
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/80">
            Join Yegara Trading Share Company's digital transformation journey and access exclusive learning resources.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="group inline-flex items-center gap-3 bg-[#dc2626] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#b91c1c] transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              Become a Shareholder
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#2563eb] transition-all duration-300 hover:-translate-y-1"
            >
              Contact Us Today
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Data Arrays
const features = [
  {
    icon: AcademicCapIcon,
    title: 'Digital Training',
    description: 'Access modern training modules designed for shareholder success and professional growth.',
    amharic: 'ዘመናዊ የስልጠና መርሃ ግብሮች'
  },
  {
    icon: BookOpenIcon,
    title: 'Resource Library',
    description: 'Comprehensive collection of documents, videos, and learning materials at your fingertips.',
    amharic: 'ሰፊ የመረጃ እና ትምህርት ማዕከል'
  },
  {
    icon: UserGroupIcon,
    title: 'Community Network',
    description: 'Connect with fellow shareholders and industry experts to share insights and experiences.',
    amharic: 'ከባለአክሲዮኖች እና ባለሙያዎች ጋር መገናኘት'
  },
  {
    icon: ChartBarIcon,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics and performance metrics.',
    amharic: 'የእድገት ክትትል'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Standards',
    description: 'Courses designed according to international standards and best practices.',
    amharic: 'አለም አቀፍ ደረጃዎች'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure Platform',
    description: 'Your data and progress are protected with enterprise-grade security.',
    amharic: 'አስተማማኝ መድረክ'
  }
]

const lmsFeatures = [
  {
    title: 'Personalized Learning Path',
    description: 'Track your progress through customized training modules tailored to your needs'
  },
  {
    title: 'Interactive Video Courses',
    description: 'Learn through engaging video content with quizzes and practical exercises'
  },
  {
    title: 'Downloadable Resources',
    description: 'Access PDFs, documents, and training materials for offline learning'
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your completion rates and earn certificates upon finishing courses'
  }
]

const stats = [
  { value: '500+', label: 'Active Shareholders', amharic: 'ንቁ ባለአክሲዮኖች' },
  { value: '50+', label: 'Expert-Led Courses', amharic: 'ኮርሶች' },
  { value: '95%', label: 'Satisfaction Rate', amharic: 'እርካታ መጠን' },
  { value: '24/7', label: 'Access Support', amharic: 'ድጋፍ' }
]

const testimonials = [
  {
    text: "The digital training platform has transformed how I engage with YTSC. The courses are practical and immediately applicable.",
    name: "Abebe Kebede",
    role: "Shareholder since 2020",
    avatar: "👨"
  },
  {
    text: "Being able to access training materials anytime, anywhere has made a huge difference. Highly recommended for all shareholders.",
    name: "Tigist Haile",
    role: "Board Member",
    avatar: "👩"
  },
  {
    text: "The LMS platform is intuitive and the content is excellent. I've already completed 5 courses and earned my certificates.",
    name: "Solomon Desta",
    role: "Shareholder",
    avatar: "👨"
  }
]