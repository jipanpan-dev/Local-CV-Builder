
import React from 'react';
import { CVData } from '../types';
import { Phone, Mail, Globe, MapPin } from './Icons';

interface ThemeProps {
    data: CVData;
}

const ModernTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates, hobbies } = data;
    
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    return (
        <div className="flex min-h-full font-serif text-sm">
            {/* Sidebar */}
            <div className="w-1/3 bg-gray-800 text-white p-8 flex flex-col">
                {personal.photo && (
                    <img src={personal.photo} alt={personal.fullName} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-600 object-cover" />
                )}
                <h1 className="text-3xl font-bold text-center text-white">{personal.fullName}</h1>
                <p className="text-center text-blue-300 mt-1">{personal.tagline}</p>
                
                <div className="mt-8">
                    <h2 className="text-lg font-semibold uppercase tracking-wider text-blue-300 border-b-2 border-blue-300 pb-1">Contact</h2>
                    <ul className="mt-4 space-y-3">
                        <li className="flex items-center"><Mail className="w-4 h-4 mr-3 text-blue-300" /><span>{personal.email}</span></li>
                        <li className="flex items-center"><Phone className="w-4 h-4 mr-3 text-blue-300" /><span>{personal.phone}</span></li>
                        <li className="flex items-center"><Globe className="w-4 h-4 mr-3 text-blue-300" /><span>{personal.website}</span></li>
                        <li className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-blue-300" /><span>{personal.location}</span></li>
                    </ul>
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold uppercase tracking-wider text-blue-300 border-b-2 border-blue-300 pb-1">Education</h2>
                     {education.map(edu => (
                        <div key={edu.id} className="mt-4">
                            <h3 className="font-bold text-white">{edu.degree}</h3>
                            <p className="text-gray-300 text-xs">{edu.institution}</p>
                            <p className="text-gray-400 text-xs">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                        </div>
                    ))}
                </div>

                {hobbies.length > 0 && <div className="mt-8">
                    <h2 className="text-lg font-semibold uppercase tracking-wider text-blue-300 border-b-2 border-blue-300 pb-1">Hobbies</h2>
                    <ul className="mt-4 space-y-2">
                        {hobbies.map(hobby => (
                           <li key={hobby.id} className="text-gray-300">{hobby.name}</li>
                        ))}
                    </ul>
                </div>}
            </div>

            {/* Main Content */}
            <div className="w-2/3 bg-white p-8">
                <section>
                    <h2 className="text-xl font-bold uppercase text-gray-700 border-b-2 border-gray-300 pb-2">Profile</h2>
                    <p className="mt-4 text-gray-600">{personal.bio}</p>
                </section>
                
                <section className="mt-8">
                    <h2 className="text-xl font-bold uppercase text-gray-700 border-b-2 border-gray-300 pb-2">Experience</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mt-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                                <p className="text-xs text-gray-500">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                            </div>
                            <h4 className="font-medium text-blue-600">{exp.company}</h4>
                            <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>

                {certificates.length > 0 && <section className="mt-8">
                     <h2 className="text-xl font-bold uppercase text-gray-700 border-b-2 border-gray-300 pb-2">Certificates</h2>
                     {certificates.map(cert => (
                        <div key={cert.id} className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800">{cert.name}</h3>
                            <p className="text-blue-600">{cert.issuer}</p>
                            <p className="text-xs text-gray-500">Issued {formatDate(cert.date)}</p>
                        </div>
                     ))}
                </section>}
            </div>
        </div>
    );
};

export default ModernTheme;
