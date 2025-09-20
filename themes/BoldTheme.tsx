
import React from 'react';
import { CVData } from '../types';
import { Phone, Mail, Globe, MapPin } from './Icons';

interface ThemeProps {
    data: CVData;
}

const BoldTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates } = data;

    const formatDate = (date: string) => date ? new Date(date).getFullYear() : 'Now';

    return (
        <div className="flex min-h-full font-sans">
            <aside className="w-1/3 bg-black text-white p-8 flex flex-col justify-between">
                <div>
                    {personal.photo && (
                        <img src={personal.photo} alt={personal.fullName} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-yellow-400" />
                    )}
                    <h1 className="text-4xl font-extrabold text-center uppercase tracking-wider">{personal.fullName}</h1>
                    <p className="text-center text-yellow-400 mt-2">{personal.tagline}</p>

                    <div className="mt-10">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-yellow-400">Profile</h2>
                        <p className="mt-2 text-sm text-gray-300">{personal.bio}</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold uppercase tracking-widest text-yellow-400 mt-8">Contact</h2>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-yellow-400" /><span>{personal.email}</span></li>
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-yellow-400" /><span>{personal.phone}</span></li>
                        <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-yellow-400" /><span>{personal.website}</span></li>
                        <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-400" /><span>{personal.location}</span></li>
                    </ul>
                </div>
            </aside>
            <main className="w-2/3 bg-white p-8">
                <section>
                    <h2 className="text-2xl font-extrabold uppercase text-black tracking-widest">Experience</h2>
                    <div className="border-l-4 border-yellow-400 pl-4 mt-4">
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-6">
                                <p className="text-xs text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
                                <p className="font-semibold text-gray-700">{exp.company}</p>
                                <ul className="mt-2 text-sm list-disc list-inside text-gray-600">
                                    {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
                
                <section className="mt-8">
                    <h2 className="text-2xl font-extrabold uppercase text-black tracking-widest">Education</h2>
                     <div className="border-l-4 border-yellow-400 pl-4 mt-4">
                        {education.map(edu => (
                            <div key={edu.id} className="mb-4">
                                <p className="text-xs text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                <h3 className="text-xl font-bold">{edu.degree}</h3>
                                <p className="font-semibold text-gray-700">{edu.institution}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {certificates.length > 0 && <section className="mt-8">
                    <h2 className="text-2xl font-extrabold uppercase text-black tracking-widest">Certificates</h2>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {certificates.map(cert => (
                            <div key={cert.id}>
                                <p className="font-bold">{cert.name}</p>
                                <p className="text-sm text-gray-600">{cert.issuer} ({formatDate(cert.date)})</p>
                            </div>
                        ))}
                    </div>
                </section>}
            </main>
        </div>
    );
};

export default BoldTheme;
