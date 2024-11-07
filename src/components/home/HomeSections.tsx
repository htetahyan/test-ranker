// SectionsLayout.js
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaShareSquare, FaChartLine, FaRegEye } from 'react-icons/fa';

const SectionsLayout = () => {
    const sections = [
        {
          title: 'AI Quiz Generator',
          heading: 'Generate AI-powered questions for job descriptions.',
          description: 'Enter your job description, URL, or PDF to effortlessly create a tailored quiz that suits your hiring needs. Our advanced AI analyzes the job requirements and formulates pertinent questions to evaluate candidates effectively.',
          icon: <FaQuestionCircle className="text-indigo-500 text-5xl mb-6" />,
        },
        {
          title: 'Share Your Test to Candidates',
          heading: 'Share your test with as many candidates as needed.',
          description: 'Easily share your customized test via social media or email to reach a broad audience of potential candidates. This ensures that your hiring process is inclusive and accessible, allowing you to gather responses from a diverse pool of applicants.',
          icon: <FaShareSquare className="text-green-500 text-5xl mb-6" />,
        },
        {
          title: 'View Test Results',
          heading: "View Candidates' Test Results",
          description: "Gain access to comprehensive test results, providing detailed insights into each candidate's performance. Our platform delivers an organized report, highlighting strengths and areas for improvement, helping you make informed hiring decisions.",
          icon: <FaRegEye className="text-blue-500 text-5xl mb-6" />,
        },
        {
          title: 'AI Result Analysis',
          heading: 'AI-Powered Result Analysis',
          description: 'Utilize our AI-powered analysis to interpret candidate performance with precision. The AI identifies key patterns and provides actionable insights, enabling you to assess candidate suitability efficiently and accurately.',
          icon: <FaChartLine className="text-red-500 text-5xl mb-6" />,
        },
      ];
      

  return (
   <div className='mt-4'>
    
    <h1 className="text-4xl font-bold text-center mb-12">Our Features:</h1>
    
    <div className="grid gap-12 px-4 md:px-8 lg:px-16 xl:px-32 m-4">
      {sections.map((section, index) => (
        <SectionCard
          key={index}
          title={section.title}
          heading={section.heading}
          description={section.description}
          icon={section.icon}
        />
      ))}
    </div></div> 
  );
};

export default SectionsLayout;

const SectionCard = ({ title, heading, description, icon }:any) => (
    
  <motion.div
    initial={{ opacity: 0, scale:0.7 }}
    whileInView={{ opacity: 1, scale:1 }}
    viewport={{ once: false }}
    transition={{ duration: 0.1, ease: 'easeIn' }}
    className="group relative lg:w-1/2 w-full  justify-self-center bg-gradient-to-br from-gray-50 to-white p-10 rounded-xl shadow-xl transition-transform transform-gpu hover:scale-105 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 opacity-0 group-hover:opacity-25 transition-opacity"></div>
    <div className="flex flex-col items-center text-center relative z-10">
      {icon}
      <h3 className="text-gray-700 font-semibold text-sm mb-3 uppercase tracking-wider">
        {title}
      </h3>
      <h2 className="text-gray-900 font-bold text-2xl mb-4 leading-tight">{heading}</h2>
      <p className="text-gray-600 text-md">{description}</p>
    </div>
    {/* Progress Bar */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
  </motion.div>
);
