
import React from 'react';
import { CVData } from '../types';
import { Phone, Mail, Globe, MapPin } from './Icons';

interface ThemeProps {
    data: CVData;
}

const InfographicTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates } = data;

    const formatDate = (date: string) => date ? new Date(date).getFullYear() : 'Now';

    const TimelineItem: React.FC<{
        title: string,
        subtitle: string,
        dateRange: string,
        children?: React.ReactNode
    }> = ({ title, subtitle, dateRange, children }) => (
         <div className="pl-8 relative border-l-2 border-cyan-300 py-2">
            <div className="absolute -left-3 top-2 w-5 h-5 bg-cyan-500 rounded-full border-2 border-white"></div>
            <p className="text-xs text-gray-500">{dateRange}</p>
            <h3 className="font-bold text-cyan-800">{title}</h3>
            <p className="text-sm italic text-gray-700">{subtitle}</p>
            <div className="text-xs mt-1 text-gray-600">{children}</div>
        </div>
    );


    return (
        <div className="flex min-h-full font-sans text-sm">
            <aside className="w-1/3 bg-gray-50 p-6 flex flex-col justify-between">
                 <div>
                    {personal.photo && (
                        <img src={personal.photo} alt={personal.fullName} className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg" />
                    )}
                    <h1 className="text-3xl font-bold text-center mt-4 text-cyan-900">{personal.fullName}</h1>
                    <p className="text-center text-cyan-700">{personal.tagline}</p>

                    <div className="mt-6">
                        <h2 className="font-bold text-cyan-800">About Me</h2>
                        <p className="text-xs mt-2 text-gray-600">{personal.bio}</p>
                    </div>

                    <div className="mt-6">
                        <h2 className="font-bold text-cyan-800">Contact</h2>
                         <ul className="mt-2 space-y-2 text-xs">
                            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-cyan-600"/>{personal.email}</li>
                            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-cyan-600"/>{personal.phone}</li>
                            <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-cyan-600"/>{personal.website}</li>
                            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-600"/>{personal.location}</li>
                        </ul>
                    </div>
                </div>
            </aside>
            <main className="w-2/3 bg-white p-6">
                 <section className="mb-6">
                    <h2 className="text-xl font-bold uppercase text-cyan-800 mb-3">Experience</h2>
                    {experience.map(exp => (
                        <TimelineItem 
                            key={exp.id}
                            title={exp.jobTitle}
                            subtitle={exp.company}
                            dateRange={`${formatDate(exp.startDate)} - ${exp.isCurrent ? 'Present' : formatDate(exp.endDate)}`}
                        >
                             <ul className="list-disc list-inside space-y-1">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </TimelineItem>
                    ))}
                 </section>
                  <section className="mb-6">
                    <h2 className="text-xl font-bold uppercase text-cyan-800 mb-3">Education</h2>
                     {education.map(edu => (
                        <TimelineItem 
                            key={edu.id}
                            title={edu.degree}
                            subtitle={edu.institution}
                            dateRange={`${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`}
                        />
                    ))}
                 </section>

                {certificates.length > 0 && <section>
                    <h2 className="text-xl font-bold uppercase text-cyan-800 mb-3">Certificates</h2>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        {certificates.map(cert => (
                            <div key={cert.id} className="p-2 bg-cyan-50 rounded">
                                <p className="font-semibold text-cyan-900">{cert.name}</p>
                                <p>{cert.issuer} ({formatDate(cert.date)})</p>
                            </div>
                        ))}
                    </div>
                </section>}
            </main>
        </div>
    );
};

export default InfographicTheme;
