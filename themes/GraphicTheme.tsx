
import React from 'react';
import { CVData } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, GraduationCap, Award } from './Icons';

interface ThemeProps {
    data: CVData;
}

const GraphicTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates } = data;

    const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric' }) : 'Now';

    const Section: React.FC<{title: string, icon: React.ReactNode, children: React.ReactNode}> = ({title, icon, children}) => (
        <section className="mb-6">
            <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center mr-4">{icon}</div>
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className="ml-14 border-l-2 border-indigo-200 pl-4">
                {children}
            </div>
        </section>
    )

    return (
        <div className="bg-white min-h-full font-sans">
            <header className="bg-indigo-50 p-8 flex items-center justify-between">
                <div>
                    <h1 className="text-5xl font-extrabold text-indigo-900">{personal.fullName}</h1>
                    <p className="text-lg text-indigo-700 mt-1">{personal.tagline}</p>
                    <p className="mt-4 max-w-xl text-gray-600 text-sm">{personal.bio}</p>
                </div>
                {personal.photo && <img src={personal.photo} alt={personal.fullName} className="w-40 h-40 object-cover rounded-lg shadow-lg border-4 border-white"/>}
            </header>
            <div className="p-8">
                <div className="grid grid-cols-4 gap-4 text-sm text-center mb-8 pb-4 border-b">
                    <div className="flex items-center justify-center gap-2"><Mail className="w-5 h-5 text-indigo-500"/>{personal.email}</div>
                    <div className="flex items-center justify-center gap-2"><Phone className="w-5 h-5 text-indigo-500"/>{personal.phone}</div>
                    <div className="flex items-center justify-center gap-2"><Globe className="w-5 h-5 text-indigo-500"/>{personal.website}</div>
                    <div className="flex items-center justify-center gap-2"><MapPin className="w-5 h-5 text-indigo-500"/>{personal.location}</div>
                </div>

                <Section title="Experience" icon={<Briefcase className="w-6 h-6"/>}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <p className="text-xs text-indigo-500 font-semibold">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                            <h3 className="font-bold text-lg text-gray-800">{exp.jobTitle}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                        </div>
                    ))}
                </Section>
                <Section title="Education" icon={<GraduationCap className="w-6 h-6"/>}>
                     {education.map(edu => (
                        <div key={edu.id} className="mb-4">
                            <p className="text-xs text-indigo-500 font-semibold">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                            <h3 className="font-bold text-lg text-gray-800">{edu.degree}</h3>
                            <p className="text-gray-600">{edu.institution}</p>
                        </div>
                    ))}
                </Section>
                {certificates.length > 0 && <Section title="Certificates" icon={<Award className="w-6 h-6"/>}>
                    {certificates.map(cert => (
                        <div key={cert.id} className="mb-3">
                            <h3 className="font-bold text-gray-800">{cert.name}</h3>
                            <p className="text-sm text-gray-600">{cert.issuer} - {formatDate(cert.date)}</p>
                        </div>
                    ))}
                </Section>}
            </div>
        </div>
    );
};

export default GraphicTheme;
