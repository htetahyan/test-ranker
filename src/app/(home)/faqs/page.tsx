// faq.js
'use client';
import React from 'react';
import { Accordion, AccordionItem } from "@nextui-org/react";

const faqData = [
  {
    id: 1,
    title: "What is TrySkillsTest?",
    content: "TrySkillsTest is a platform that generates AI-powered skill quizzes from job descriptions to help evaluate candidates' abilities."
  },
  {
    id: 2,
    title: "How does the quiz generation work?",
    content: "Our advanced AI analyzes the job requirements and formulates pertinent questions to effectively evaluate candidates."
  },
  {
    id: 3,
    title: "Can I share the quizzes with candidates?",
    content: "Yes, you can easily share your customized test via social media or email to reach a broad audience of potential candidates."
  },
  {
    id: 4,
    title: "How can I view the test results?",
    content: "You gain access to comprehensive test results, providing detailed insights into each candidate's performance with organized reports."
  },
  {
    id: 5,
    title: "Is there an analysis of the results?",
    content: "Yes, our AI-powered analysis interprets candidate performance with precision and provides actionable insights."
  }
];

const FAQPage = () => {
  return (
    <div className="p-8 bg-gray-100 h-fit mt-20">
      <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
      <Accordion variant="splitted">
        {faqData.map(faq => (
          <AccordionItem key={faq.id} aria-label={faq.title} title={faq.title}>
            {faq.content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQPage;
