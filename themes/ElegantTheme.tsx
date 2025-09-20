
import React from 'react';
import { CVData } from '../types';

interface ThemeProps {
    data: CVData;
}

const ElegantTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates } = data;

    const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Present';

    const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
         <section className="mb-8">
            <h2 className="text-xl font-light uppercase tracking-[0.2em] text-gray-600 border-b border-gray-300 pb-2 mb-4 text-center">{title}</h2>
            {children}
        </section>
    );

    return (
        <div className="p-10 bg-white font-serif text-gray-700">
            <header className="text-center mb-10">
                {personal.photo && (
                    <img src={personal.photo} alt={personal.fullName} className="w-28 h-28 rounded-full mx-auto mb-5 object-cover" />
                )}
                <h1 className="text-5xl font-thin tracking-widest">{personal.fullName}</h1>
                <p className="mt-2 text-lg text-gray-500">{personal.tagline}</p>
                <div className="mt-4 text-xs tracking-wider">
                    {personal.email} &nbsp;&bull;&nbsp; {personal.phone} &nbsp;&bull;&nbsp; {personal.website}
                </div>
            </header>
            
            <p className="text-center italic mb-10">{personal.bio}</p>

            <Section title="Experience">
                 {experience.map(exp => (
                    <div key={exp.id} className="mb-5">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-gray-800">{exp.jobTitle} at {exp.company}</h3>
                            <p className="text-sm text-gray-500">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                        </div>
                        <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>

            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-4">
                        <div className="flex justify-between">
                             <h3 className="text-lg font-medium text-gray-800">{edu.degree} from {edu.institution}</h3>
                             <p className="text-sm text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                        </div>
                    </div>
                ))}
            </Section>

            {certificates.length > 0 && <Section title="Certificates">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-center">
                    {certificates.map(cert => (
                        <div key={cert.id}>
                            <p className="font-medium text-gray-800">{cert.name}</p>
                            <p className="text-sm">{cert.issuer} ({formatDate(cert.date)})</p>
                        </div>
                    ))}
                </div>
            </Section>}
        </div>
    );
};

export default ElegantTheme;
