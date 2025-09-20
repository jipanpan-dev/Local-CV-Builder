
import React from 'react';
import { CVData } from '../types';

interface ThemeProps {
    data: CVData;
}

const AcademicTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates } = data;
    
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }

    return (
        <div className="p-10 bg-white font-serif text-gray-800 text-sm">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-wider">{personal.fullName}</h1>
                <div className="mt-2 text-xs text-gray-600">
                    <span>{personal.location}</span> | <span>{personal.phone}</span> | <span>{personal.email}</span> | <span>{personal.website}</span>
                </div>
            </header>

            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3">
                        <div className="flex justify-between">
                            <p className="font-bold">{edu.institution}</p>
                            <p className="text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                        </div>
                        <p className="italic">{edu.degree}</p>
                        <p className="text-xs mt-1">{edu.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">Professional Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3">
                        <div className="flex justify-between">
                             <p className="font-bold">{exp.company}</p>
                             <p className="text-gray-600">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                        </div>
                        <p className="italic">{exp.jobTitle}</p>
                        <ul className="list-disc list-inside text-xs mt-1 space-y-1">
                             {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            {certificates.length > 0 && <section>
                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">Publications & Certificates</h2>
                 {certificates.map(cert => (
                    <div key={cert.id} className="mb-2">
                        <p><strong>{cert.name}</strong>, {cert.issuer}, {new Date(cert.date).getFullYear()}</p>
                    </div>
                 ))}
            </section>}
        </div>
    );
};

export default AcademicTheme;
