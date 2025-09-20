
import React from 'react';
import { CVData } from '../types';
import { Phone, Mail, Globe, MapPin } from './Icons';

interface ThemeProps {
    data: CVData;
}

const CreativeTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates, hobbies } = data;
    
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Current';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    return (
        <div className="bg-white min-h-full font-sans flex flex-col">
            {/* Header */}
            <header className="bg-teal-600 text-white p-10 flex items-center justify-between">
                <div>
                    <h1 className="text-5xl font-extrabold tracking-tight">{personal.fullName}</h1>
                    <p className="text-xl text-teal-100 mt-1">{personal.tagline}</p>
                </div>
                {personal.photo && (
                    <img src={personal.photo} alt={personal.fullName} className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover" />
                )}
            </header>
            
            <div className="flex flex-grow">
                {/* Main Content */}
                <main className="w-2/3 p-8">
                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 flex items-center gap-3">
                            <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">P</span>
                            Profile
                        </h2>
                        <p className="mt-4 text-gray-700 border-l-4 border-teal-100 pl-4">{personal.bio}</p>
                    </section>
                    
                    <section className="mt-8">
                        <h2 className="text-2xl font-bold text-teal-700 flex items-center gap-3">
                            <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">W</span>
                            Work Experience
                        </h2>
                        {experience.map(exp => (
                            <div key={exp.id} className="mt-4 pl-12 relative before:absolute before:left-4 before:top-2 before:w-1 before:h-full before:bg-teal-100">
                                <div className="absolute left-1 top-2 w-6 h-6 bg-teal-600 rounded-full border-4 border-white"></div>
                                <p className="text-xs text-gray-500">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Current' : formatDate(exp.endDate)}</p>
                                <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                                <h4 className="font-medium text-teal-600">{exp.company}</h4>
                                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                    {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </div>
                        ))}
                    </section>
                    
                    {certificates.length > 0 && <section className="mt-8">
                        <h2 className="text-2xl font-bold text-teal-700 flex items-center gap-3">
                             <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">C</span>
                            Certifications
                        </h2>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {certificates.map(cert => (
                                <div key={cert.id} className="p-3 bg-teal-50 rounded-lg">
                                    <h3 className="font-semibold text-teal-800">{cert.name}</h3>
                                    <p className="text-sm text-gray-600">{cert.issuer} - {formatDate(cert.date)}</p>
                                </div>
                            ))}
                        </div>
                    </section>}
                </main>
                
                {/* Sidebar */}
                <aside className="w-1/3 bg-gray-50 p-8 border-l-2 border-gray-100">
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">Contact</h3>
                        <ul className="mt-3 space-y-3 text-sm">
                           <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-teal-600" /><span>{personal.email}</span></li>
                           <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-teal-600" /><span>{personal.phone}</span></li>
                           <li className="flex items-center gap-3"><Globe className="w-5 h-5 text-teal-600" /><span>{personal.website}</span></li>
                           <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-teal-600" /><span>{personal.location}</span></li>
                        </ul>
                    </div>
                    
                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-gray-700">Education</h3>
                         {education.map(edu => (
                            <div key={edu.id} className="mt-3">
                                <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                                <p className="text-sm text-teal-700">{edu.institution}</p>
                                <p className="text-xs text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                            </div>
                        ))}
                    </div>

                    {hobbies.length > 0 && <div className="mt-8">
                        <h3 className="text-lg font-bold text-gray-700">Hobbies</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                             {hobbies.map(hobby => (
                                <span key={hobby.id} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">{hobby.name}</span>
                            ))}
                        </div>
                    </div>}
                </aside>
            </div>
        </div>
    );
};

export default CreativeTheme;
