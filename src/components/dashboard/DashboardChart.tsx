'use client'
import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import  'chart.js/auto';

const DashboardChart = () => {
  const data = [
    {
      Assessments: { id: 3, name: 'new assessment', jobRole: 'Angular Developer' },
      Candidates: { currentStep: 'sign', isSigned: false, status: 'pending', score: null },
    },
    {
      Assessments: { id: 5, name: 'name', jobRole: 'React Developer' },
      Candidates: { currentStep: 'finished', isSigned: true, status: 'pending', score: 75 },
    },
    {
      Assessments: { id: 6, name: 'react', jobRole: 'Python Developer' },
      Candidates: null,
    },
    {
      Assessments: { id: 4, name: 'new assessment', jobRole: 'Happiness Engineer' },
      Candidates: null,
    },
  ];

  const jobRoles = data.map(item => item.Assessments.jobRole);
  const jobRoleCounts = jobRoles.reduce((acc, role) => {
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});
  
  const jobRoleChartData = {
    labels: Object.keys(jobRoleCounts),
    datasets: [
      {
        label: 'Assessments by Job Role',
        data: Object.values(jobRoleCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const candidateStatuses = data.map(item => item.Candidates?.currentStep || 'No Candidate');
  const statusCounts = candidateStatuses.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Candidate Status',
        data: Object.values(statusCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const scores = data
    .filter(item => item.Candidates && item.Candidates.score !== null)
    .map(item => item.Candidates.score);
  const scoreChartData = {
    labels: scores.map((_, index) => `Candidate ${index + 1}`),
    datasets: [
      {
        label: 'Candidate Scores',
        data: scores,
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="w-full grid max-h-screen relative  grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="chart-container">
        <h2 className="text-center text-sm font-medium mb-2">Assessments by Job Role</h2>
        <Pie data={jobRoleChartData} options={{ maintainAspectRatio: false }} />
      </div>

      <div className="chart-container">
        <h2 className="text-center text-sm font-medium mb-2">Candidate Status</h2>
        <Bar data={statusChartData} options={{ maintainAspectRatio: false }} />
      </div>

      <div className="chart-container">
        <h2 className="text-center text-sm font-medium mb-2">Candidate Scores</h2>
        <Line data={scoreChartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default DashboardChart;
