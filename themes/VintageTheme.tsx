
import React from 'react';
import { CVData } from '../types';

interface ThemeProps {
    data: CVData;
}

const VintageTheme: React.FC<ThemeProps> = ({ data }) => {
    const { personal, experience, education, certificates } = data;
    
    const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Present';

    return (
        <div className="bg-[#fdf6e3] p-10 font-serif text-[#586e75] min-h-full border-8 border-double border-[#d2c8aa]">
            <header className="text-center mb-8">
                {personal.photo && (
                    <img src={personal.photo} alt={personal.fullName} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover sepia" />
                )}
                <h1 className="text-4xl font-bold">{personal.fullName}</h1>
                <p className="text-lg italic mt-1">{personal.tagline}</p>
                <div className="mt-3 text-xs flex justify-center items-center gap-3">
                    <span>{personal.email}</span>
                    <span>&mdash;</span>
                    <span>{personal.phone}</span>
                     <span>&mdash;</span>
                    <span>{personal.location}</span>
                </div>
            </header>

            <section className="mb-6">
                 <h2 className="text-center text-xl tracking-widest font-semibold mb-3">PROFILE</h2>
                 <p className="text-center text-sm">{personal.bio}</p>
            </section>
            
            <div className="h-px bg-[#d2c8aa] w-1/2 mx-auto my-6"></div>

            <section className="mb-6">
                <h2 className="text-center text-xl tracking-widest font-semibold mb-4">EXPERIENCE</h2>
                 {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-bold text-[#268bd2]">{exp.jobTitle}</h3>
                            <p className="text-sm">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                        </div>
                        <p className="italic text-md">{exp.company}</p>
                         <ul className="mt-1 text-sm list-disc list-inside space-y-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
            
            <div className="h-px bg-[#d2c8aa] w-1/2 mx-auto my-6"></div>
            
            <section className="mb-6">
                <h2 className="text-center text-xl tracking-widest font-semibold mb-4">EDUCATION</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3">
                         <div className="flex justify-between">
                             <h3 className="text-lg font-bold text-[#268bd2]">{edu.degree}</h3>
                             <p className="text-sm">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                         </div>
                         <p className="italic text-md">{edu.institution}</p>
                    </div>
                ))}
            </section>

             {certificates.length > 0 && <>
                <div className="h-px bg-[#d2c8aa] w-1/2 mx-auto my-6"></div>
                <section>
                    <h2 className="text-center text-xl tracking-widest font-semibold mb-4">CERTIFICATES</h2>
                    {certificates.map(cert => (
                        <p key={cert.id} className="text-center text-sm mb-1">
                            <span className="font-bold">{cert.name}</span>, {cert.issuer} ({formatDate(cert.date)})
                        </p>
                    ))}
                </section>
             </>}

        </div>
    );
};

export default VintageTheme;
