import React from 'react'
import { Skeleton, Badge, Divider, Chip } from '@nextui-org/react'
import { SelectCandidates, SelectCandidatesInfo } from '@/db/schema/schema'
import { FaEnvelope, FaFlag, FaLanguage, FaVenusMars, FaGraduationCap, FaUserTie, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import { useGetCandidateInfoQuery } from '@/quries/CandidateResultQuery'

const CandidateInfoHead = ({ candidateId }: { candidateId: number }) => {
  const { data, isLoading } = useGetCandidateInfoQuery(candidateId)
  
  const { candidateInfo, candidate } = data?.data ?? {}
  const { currentStep, email, fullName, isSigned } = candidate as SelectCandidates || {}
  const {
    countryOfOrigin,
    countryOfResidence,
    firstLanguage,
    gender,
    studyField,
    yearOfExperience,
    birthDate,
    highestEducation,
    mostRelevantExperience,
    browser,
    cpu,
    device,
    location,
    os,
    versionId,
    ip
  } = candidateInfo as SelectCandidatesInfo || {}

  return (
    <div className="p-4 w-full mx-auto">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ) : (
        <div className="border border-gray-200 shadow-lg p-6 space-y-4 rounded-lg">
          <div className='flex items-center justify-between'>
            <h2 className="text-3xl font-bold">{fullName}</h2>
            <Chip size='lg' color={currentStep === 'finished' ? 'success' : 'warning'}>
              {currentStep}
            </Chip>
          </div>
          <Divider/>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center">
              <FaEnvelope className="mr-2 text-gray-600" />
              <span className="font-semibold">Email:</span> {email}
            </div>
            <div className="flex items-center">
              <FaFlag className="mr-2 text-gray-600" />
              <span className="font-semibold">Country of Origin:</span> {countryOfOrigin}
            </div>
            <div className="flex items-center">
              <FaFlag className="mr-2 text-gray-600" />
              <span className="font-semibold">Country of Residence:</span> {countryOfResidence}
            </div>
            <div className="flex items-center">
              <FaLanguage className="mr-2 text-gray-600" />
              <span className="font-semibold">First Language:</span> {firstLanguage}
            </div>
            <div className="flex items-center">
              <FaVenusMars className="mr-2 text-gray-600" />
              <span className="font-semibold">Gender:</span> {gender}
            </div>
            <div className="col-span-2 flex items-center">
              <FaUserTie className="mr-2 text-gray-600" />
              <span className="font-semibold">Field of Study:</span> {studyField}
            </div>
            <div className="flex items-center">
              <FaBriefcase className="mr-2 text-gray-600" />
              <span className="font-semibold">Years of Experience:</span> {yearOfExperience} years
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-600" />
              <span className="font-semibold">Birth Date:</span> {birthDate}
            </div>
            <div className="flex items-center">
              <FaGraduationCap className="mr-2 text-gray-600" />
              <span className="font-semibold">Highest Education:</span> {highestEducation}
            </div>
            <div className="flex items-center">
              <FaBriefcase className="mr-2 text-gray-600" />
              <span className="font-semibold">Most Relevant Experience:</span> {mostRelevantExperience}
            </div>
            {/* Additional data fields */}
            <div className="flex items-center">
              <span className="font-semibold">Browser:</span> {browser}
            </div>
            <div className="flex items-center">
              <span className="font-semibold">CPU:</span> {cpu}
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Device:</span> {device}
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Location:</span> {location}
            </div>
            <div className="flex items-center">
              <span className="font-semibold">OS:</span> {os}
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Version ID:</span> {versionId}
            </div>
            <div className="flex items-center">
              <span className="font-semibold">IP Address:</span> {ip}
            </div>
          </div>

          <hr className="my-4 border-t border-gray-300" />
          <div className="flex items-center">
            <span className="font-semibold mr-2">Status:</span>
            <Chip color={isSigned ? 'success' : 'danger'}>
              {isSigned ? 'Signed' : 'Not Signed'}
            </Chip>
          </div>
        </div>
      )}
    </div>
  )
}

export default CandidateInfoHead
