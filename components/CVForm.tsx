import React, { useState } from 'react';
import { CVData, PaperSize, Theme, PortfolioItem } from '../types';
import { initialCVData, emptyCVData } from '../constants';
import type { ChangeEvent } from 'react';

interface CVFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  paperSize: PaperSize;
  setPaperSize: React.Dispatch<React.SetStateAction<PaperSize>>;
  onExport: () => void;
  isGeneratingPdf: boolean;
}

const CVForm: React.FC<CVFormProps> = ({ cvData, setCvData, theme, setTheme, paperSize, setPaperSize, onExport, isGeneratingPdf }) => {

  const handlePersonalChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };
  
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCvData(prev => ({ ...prev, personal: { ...prev.personal, photo: event.target?.result as string } }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handlePortfolioImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = event.target?.result as string;
        setCvData(prev => {
          const list = [...prev.portfolio];
          list[index] = { ...list[index], image };
          return { ...prev, portfolio: list };
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDynamicChange = <T extends {id: string}>(section: Exclude<keyof CVData, 'personal'>, index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isCheckbox = e.target.type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    setCvData(prev => {
      const list = [...(prev[section] as unknown as T[])];
      list[index] = { ...list[index], [name]: isCheckbox ? checked : value };
      return { ...prev, [section]: list };
    });
  };
  
  const addDynamicItem = (section: Exclude<keyof CVData, 'personal'>) => {
    let newItem;
    switch (section) {
      case 'experience':
        newItem = { id: crypto.randomUUID(), jobTitle: '', company: '', startDate: '', endDate: '', isCurrent: false, description: '' };
        break;
      case 'education':
        newItem = { id: crypto.randomUUID(), degree: '', institution: '', startDate: '', endDate: '', description: '' };
        break;
      case 'certificates':
        newItem = { id: crypto.randomUUID(), name: '', issuer: '', date: '' };
        break;
      case 'hobbies':
        newItem = { id: crypto.randomUUID(), name: '' };
        break;
      case 'portfolio':
        newItem = { id: crypto.randomUUID(), projectName: '', image: '', description: '', year: '' };
        break;
      default:
        return;
    }
    setCvData(prev => ({ ...prev, [section]: [...(prev[section] as any[]), newItem] }));
  };

  const removeDynamicItem = (section: Exclude<keyof CVData, 'personal'>, id: string) => {
    setCvData(prev => ({ ...prev, [section]: (prev[section] as any[]).filter(item => item.id !== id) }));
  };
  
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all data? This will erase everything you've entered.")) {
      setCvData(emptyCVData);
    }
  };

  const handleLoadExample = () => {
    if (window.confirm("Are you sure you want to load the example data? This will overwrite your current data.")) {
      setCvData(initialCVData);
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">CV Builder</h1>
      <ExportControls 
        theme={theme} 
        setTheme={setTheme} 
        paperSize={paperSize} 
        setPaperSize={setPaperSize} 
        onExport={onExport} 
        isGeneratingPdf={isGeneratingPdf}
        onClearAll={handleClearAll}
        onLoadExample={handleLoadExample}
      />
      
      <FormSection title="Personal Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" name="fullName" value={cvData.personal.fullName} onChange={handlePersonalChange} />
          <Input label="Tagline" name="tagline" value={cvData.personal.tagline} onChange={handlePersonalChange} />
          <Input label="Email" name="email" type="email" value={cvData.personal.email} onChange={handlePersonalChange} />
          <Input label="Phone" name="phone" type="tel" value={cvData.personal.phone} onChange={handlePersonalChange} />
          <Input label="Website" name="website" value={cvData.personal.website} onChange={handlePersonalChange} />
          <Input label="Location" name="location" value={cvData.personal.location} onChange={handlePersonalChange} />
          <Input label="Religion" name="religion" value={cvData.personal.religion} onChange={handlePersonalChange} />
          <Input label="Date of Birth" name="dob" type="date" value={cvData.personal.dob} onChange={handlePersonalChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
           {cvData.personal.photo && <img src={cvData.personal.photo} alt="Preview" className="mt-2 h-20 w-20 rounded-full object-cover"/>}
        </div>
        <TextArea label="Short Bio" name="bio" value={cvData.personal.bio} onChange={handlePersonalChange} />
      </FormSection>

      <FormSection title="Work Experience">
        {cvData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-md space-y-4 mb-4 relative">
                 <button onClick={() => removeDynamicItem('experience', exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
                 <Input label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleDynamicChange('experience', index, e)} />
                 <Input label="Company" name="company" value={exp.company} onChange={(e) => handleDynamicChange('experience', index, e)} />
                 <div className="grid grid-cols-2 gap-4">
                     <Input label="Start Date" name="startDate" type="date" value={exp.startDate} onChange={(e) => handleDynamicChange('experience', index, e)} />
                     <Input label="End Date" name="endDate" type="date" value={exp.endDate} onChange={(e) => handleDynamicChange('experience', index, e)} disabled={exp.isCurrent} />
                 </div>
                 <div className="flex items-center">
                    <input type="checkbox" id={`current-${exp.id}`} name="isCurrent" checked={exp.isCurrent} onChange={(e) => handleDynamicChange('experience', index, e)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                    <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-gray-900">I currently work here</label>
                 </div>
                 <TextArea label="Description" name="description" value={exp.description} onChange={(e) => handleDynamicChange('experience', index, e)} />
            </div>
        ))}
        <button onClick={() => addDynamicItem('experience')} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Experience</button>
      </FormSection>
      
      <FormSection title="Education">
        {cvData.education.map((edu, index) => (
          <div key={edu.id} className="p-4 border rounded-md space-y-4 mb-4 relative">
            <button onClick={() => removeDynamicItem('education', edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
            <Input label="Degree / Field of Study" name="degree" value={edu.degree} onChange={(e) => handleDynamicChange('education', index, e)} />
            <Input label="Institution" name="institution" value={edu.institution} onChange={(e) => handleDynamicChange('education', index, e)} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" name="startDate" type="date" value={edu.startDate} onChange={(e) => handleDynamicChange('education', index, e)} />
              <Input label="End Date" name="endDate" type="date" value={edu.endDate} onChange={(e) => handleDynamicChange('education', index, e)} />
            </div>
            <TextArea label="Description" name="description" value={edu.description} onChange={(e) => handleDynamicChange('education', index, e)} />
          </div>
        ))}
        <button onClick={() => addDynamicItem('education')} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Education</button>
      </FormSection>

      <FormSection title="Portfolio">
        {cvData.portfolio.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-md space-y-4 mb-4 relative">
            <button onClick={() => removeDynamicItem('portfolio', item.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
            <Input label="Project Name" name="projectName" value={item.projectName} onChange={(e) => handleDynamicChange('portfolio', index, e)} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image/Thumbnail</label>
              <input type="file" accept="image/*" onChange={(e) => handlePortfolioImageChange(index, e)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
              {item.image && <img src={item.image} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-md"/>}
            </div>
            <TextArea label="Short Description (Optional)" name="description" value={item.description || ''} onChange={(e) => handleDynamicChange('portfolio', index, e)} />
            <Input label="Year (Optional)" name="year" value={item.year || ''} onChange={(e) => handleDynamicChange('portfolio', index, e)} />
          </div>
        ))}
        <button onClick={() => addDynamicItem('portfolio')} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Portfolio Item</button>
      </FormSection>
      
      <FormSection title="Certificates">
        {cvData.certificates.map((cert, index) => (
          <div key={cert.id} className="p-4 border rounded-md space-y-4 mb-4 relative">
            <button onClick={() => removeDynamicItem('certificates', cert.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
            <Input label="Certificate Name" name="name" value={cert.name} onChange={(e) => handleDynamicChange('certificates', index, e)} />
            <Input label="Issuer" name="issuer" value={cert.issuer} onChange={(e) => handleDynamicChange('certificates', index, e)} />
            <Input label="Date Issued" name="date" type="date" value={cert.date} onChange={(e) => handleDynamicChange('certificates', index, e)} />
          </div>
        ))}
        <button onClick={() => addDynamicItem('certificates')} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Certificate</button>
      </FormSection>

      <FormSection title="Hobbies">
        {cvData.hobbies.map((hobby, index) => (
          <div key={hobby.id} className="flex items-center gap-2 mb-2">
            <Input label="" name="name" value={hobby.name} onChange={(e) => handleDynamicChange('hobbies', index, e)} className="flex-grow"/>
            <button onClick={() => removeDynamicItem('hobbies', hobby.id)} className="px-2 py-1 text-red-500 hover:text-red-700">&times;</button>
          </div>
        ))}
        <button onClick={() => addDynamicItem('hobbies')} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Hobby</button>
      </FormSection>
    </div>
  );
};

// Sub-components for Form
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}
const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-t pt-6">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left">
        <h2 className="text-xl font-semibold text-gray-700 flex justify-between items-center">
          {title}
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>&#9660;</span>
        </h2>
      </button>
      {isOpen && <div className="mt-4 space-y-4">{children}</div>}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div>
    {label && <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      id={props.name}
      {...props}
      className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${props.className}`}
    />
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}
const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => (
  <div>
    <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      id={props.name}
      rows={4}
      {...props}
      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);


interface ExportControlsProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    paperSize: PaperSize;
    setPaperSize: (size: PaperSize) => void;
    onExport: () => void;
    isGeneratingPdf: boolean;
    onClearAll: () => void;
    onLoadExample: () => void;
}
const ExportControls: React.FC<ExportControlsProps> = ({ theme, setTheme, paperSize, setPaperSize, onExport, isGeneratingPdf, onClearAll, onLoadExample }) => {
    return (
        <div className="p-4 bg-slate-100 border rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 w-full md:w-auto">
                <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
                    <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value as Theme)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        {Object.values(Theme).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="paperSize" className="block text-sm font-medium text-gray-700">Paper Size</label>
                    <select id="paperSize" value={paperSize} onChange={(e) => setPaperSize(e.target.value as PaperSize)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        {Object.values(PaperSize).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button 
                    onClick={onLoadExample}
                    disabled={isGeneratingPdf}
                    className="w-full sm:w-auto px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Load Example
                </button>
                <button 
                    onClick={onClearAll}
                    disabled={isGeneratingPdf}
                    className="w-full sm:w-auto px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Clear All
                </button>
                <button 
                    onClick={onExport}
                    disabled={isGeneratingPdf}
                    className="w-full sm:w-auto px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isGeneratingPdf ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : 'Export to PDF'}
                </button>
            </div>
        </div>
    );
}

export default CVForm;