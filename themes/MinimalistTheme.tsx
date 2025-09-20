
import React from 'react';
import { CVData } from '../types';

interface ThemeProps {
    data: CVData;
}

const MinimalistTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates } = data;

    const formatDate = (date: string) => date ? new Date(date).getFullYear().toString() : 'Present';

    return (
        <div className="p-12 bg-white font-light text-gray-700 text-sm font-sans">
            <header className="text-center mb-12">
                {personal.photo && <img src={personal.photo} alt={personal.fullName} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"/>}
                <h1 className="text-4xl font-normal tracking-wider">{personal.fullName}</h1>
                <p className="mt-1 text-gray-500">{personal.tagline}</p>
                <div className="mt-4 text-xs text-gray-500">
                    {personal.email} &bull; {personal.phone} &bull; {personal.website} &bull; {personal.location}
                </div>
            </header>

            <p className="mb-10 text-center text-base">{personal.bio}</p>

            <section>
                <h2 className="text-lg font-normal tracking-widest text-gray-500 mb-4">EXPERIENCE</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-6">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-normal text-base text-black">{exp.jobTitle} / {exp.company}</h3>
                            <p className="text-xs">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                        </div>
                        <ul className="mt-2 list-disc list-inside text-gray-600 font-light">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
            
            <section className="mt-10">
                <h2 className="text-lg font-normal tracking-widest text-gray-500 mb-4">EDUCATION</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                           <h3 className="font-normal text-base text-black">{edu.degree} / {edu.institution}</h3>
                           <p className="text-xs">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                        </div>
                    </div>
                ))}
            </section>

             {certificates.length > 0 && <section className="mt-10">
                <h2 className="text-lg font-normal tracking-widest text-gray-500 mb-4">CERTIFICATES</h2>
                {certificates.map(cert => (
                    <div key={cert.id} className="mb-2">
                       <p><span className="text-black">{cert.name}</span>, {cert.issuer} ({new Date(cert.date).getFullYear()})</p>
                    </div>
                ))}
            </section>}
        </div>
    );
};

export default MinimalistTheme;
