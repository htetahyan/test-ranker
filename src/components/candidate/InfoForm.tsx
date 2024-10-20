'use client';

import { SelectAssessments, SelectCandidates } from '@/db/schema/schema';
import { useUploadInfoMutation } from '@/quries/CandidateQuery';
import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';

const CandidateInfoForm = ({ assessment, candidate }: { assessment: SelectAssessments, candidate: SelectCandidates }) => {
  const [resume, setResume] = useState<any>(null);
const [mutate,{isLoading}]=useUploadInfoMutation()
  const validationSchema = Yup.object({
    highestEducation: Yup.string().required('Required'),
    studyField: Yup.string().required('Required'),
    mostRelevantExperience: Yup.string().required('Required'),
    yearOfExperience: Yup.number().required('Required').min(0, 'Must be greater than or equal to 0'),
    gender: Yup.string().required('Required'),
    birthDate: Yup.date().required('Required'),
    countryOfResidence: Yup.string().required('Required'),
    countryOfOrigin: Yup.string().required('Required'),
  });
const router=useRouter()
  const formik = useFormik({
    initialValues: {
      highestEducation: '',
      studyField: '',
      mostRelevantExperience: '',
      yearOfExperience: '',
      gender: 'male',
      birthDate: '',
      countryOfResidence: '',
      countryOfOrigin: '',
      assessmentsId: assessment?.id,
      candidateId: candidate.id,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();

      Object.keys(values).forEach(key => {
        formData.append(key, JSON.stringify(values[key as keyof typeof formik.values]));
      });
      console.log(resume);

     resume && formData.append('resume', resume);

 await mutate({formData}).unwrap().finally(() => {
   router.push('/candidate/success');
 }); 
     /*  const res=await mutate({values,resume}) */

      // Handle form submission response
    },
  });

  const resumeChange = (file: File) => {
    setResume(file);
  };

  const formFields = [
    { name: 'highestEducation', label: 'Highest Education', type: 'select', options: [ 'High School','associate degree','Bachelor', 'Master', 'PhD'] },
    { name: 'studyField', label: 'Study Field', type: 'text' },
    { name: 'mostRelevantExperience', label: 'Most Relevant Experience', type: 'text' },
    { name: 'yearOfExperience', label: 'Years of Experience', type: 'number' },
    { name: 'gender', label: 'Gender', type: 'select', options: ['male', 'female', 'other'] },
    { name: 'birthDate', label: 'Birth Date', type: 'date' },
    { name: 'countryOfResidence', label: 'Country of Residence', type: 'select' ,options:countries},
    { name: 'countryOfOrigin', label: 'Country of Origin',type: 'select' ,options:countries },
    { name: 'firstLanguage', label: 'First Language', type: 'text' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Candidate Information</h1>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {formFields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium">{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formik.values[field.name as keyof typeof formik.values]}
                onChange={formik.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                {field.options!.map(option => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <Input

                name={field.name}
                type={field.type}
                value={formik.values[field.name as keyof typeof formik.values] as string}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            )}
            {formik.touched[field.name as keyof typeof formik.values] && formik.errors[field.name as keyof typeof formik.values] ? (
              <div className="text-red-500 text-sm">{formik.errors[field.name as keyof typeof formik.values]}</div>
            ) : null}
          </div>
        ))}
        <div className="col-span-2">
          <h1>Resume(optional)</h1>
        <Input type="file" name="resume" onChange={(e) => resumeChange(e!.target!.files![0]!)} />
        </div>
        <div className="col-span-2">
          <Button
          isLoading={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CandidateInfoForm;
const countries=["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]