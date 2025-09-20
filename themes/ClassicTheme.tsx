
import React from 'react';
import { CVData } from '../types';

interface ThemeProps {
    data: CVData;
}

const ClassicTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates, hobbies } = data;
    
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }

    return (
        <div className="bg-white p-10 font-serif text-gray-800">
            {/* Header */}
            <div className="text-center border-b-4 border-gray-700 pb-4">
                <h1 className="text-5xl font-bold tracking-widest">{personal.fullName}</h1>
                <p className="mt-2 text-lg">{personal.tagline}</p>
                <div className="mt-4 flex justify-center space-x-6 text-sm">
                    <span>{personal.email}</span>
                    <span>&bull;</span>
                    <span>{personal.phone}</span>
                    <span>&bull;</span>
                    <span>{personal.website}</span>
                    <span>&bull;</span>
                    <span>{personal.location}</span>
                </div>
            </div>

            {/* Profile Summary */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">Summary</h2>
                <p className="mt-4 text-justify">{personal.bio}</p>
            </section>

            {/* Experience */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">Professional Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mt-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">{exp.jobTitle}, <span className="font-normal italic">{exp.company}</span></h3>
                            <p className="text-sm font-light">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                        </div>
                        <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            {/* Education */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mt-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">{edu.degree}, <span className="font-normal italic">{edu.institution}</span></h3>
                            <p className="text-sm font-light">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                        </div>
                        <p className="mt-1 text-sm">{edu.description}</p>
                    </div>
                ))}
            </section>

            {/* Certificates */}
            {certificates.length > 0 && <section className="mt-8">
                <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">Certificates & Awards</h2>
                {certificates.map(cert => (
                    <div key={cert.id} className="mt-4">
                        <p><span className="font-bold">{cert.name}</span> from {cert.issuer} ({formatDate(cert.date)})</p>
                    </div>
                ))}
            </section>}

        </div>
    );
};

export default ClassicTheme;
