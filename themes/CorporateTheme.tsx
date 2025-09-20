
import React from 'react';
import { CVData } from '../types';
import { Phone, Mail, Globe, MapPin } from './Icons';

interface ThemeProps {
    data: CVData;
}

const CorporateTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates } = data;

    const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';

    const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
        <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 uppercase tracking-wider border-b-2 border-blue-200 pb-1 mb-3">{title}</h2>
            {children}
        </section>
    )

    return (
        <div className="flex min-h-full font-sans text-sm">
            <aside className="w-1/3 bg-gray-100 p-8">
                {personal.photo && (
                    <img src={personal.photo} alt={personal.fullName} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                )}
                <h1 className="text-3xl font-bold text-center text-blue-900">{personal.fullName}</h1>
                <p className="text-center text-gray-600 mt-1">{personal.tagline}</p>
                
                <div className="mt-8">
                    <h3 className="font-bold text-blue-800">Contact</h3>
                    <ul className="mt-2 space-y-2 text-xs">
                        <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-700"/>{personal.email}</li>
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-700"/>{personal.phone}</li>
                        <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-700"/>{personal.website}</li>
                        <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-700"/>{personal.location}</li>
                    </ul>
                </div>
                
                <div className="mt-6">
                    <h3 className="font-bold text-blue-800">Education</h3>
                    {education.map(edu => (
                        <div key={edu.id} className="mt-2">
                            <p className="font-semibold text-gray-800">{edu.degree}</p>
                            <p className="text-xs text-gray-600">{edu.institution}</p>
                            <p className="text-xs text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                        </div>
                    ))}
                </div>
            </aside>
            <main className="w-2/3 bg-white p-8">
                <Section title="Summary">
                    <p className="text-gray-700">{personal.bio}</p>
                </Section>
                <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                                <p className="text-xs text-gray-500">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                            </div>
                            <p className="text-blue-700">{exp.company}</p>
                            <ul className="mt-1 text-xs text-gray-600 list-disc list-inside space-y-1">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
                 {certificates.length > 0 && <Section title="Certifications">
                    {certificates.map(cert => (
                        <div key={cert.id} className="mb-2">
                             <p className="font-semibold text-gray-800">{cert.name}</p>
                             <p className="text-xs text-gray-600">{cert.issuer} ({formatDate(cert.date)})</p>
                        </div>
                    ))}
                </Section>}
            </main>
        </div>
    );
};

export default CorporateTheme;
