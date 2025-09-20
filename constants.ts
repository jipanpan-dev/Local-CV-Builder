import { CVData } from './types';

export const initialCVData: CVData = {
  personal: {
    fullName: 'Jane Doe',
    photo: null,
    tagline: 'Full-Stack Developer | React & Node.js Expert',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    website: 'janedoe.dev',
    location: 'San Francisco, CA',
    bio: 'A passionate developer with 5+ years of experience in building scalable web applications. I thrive in collaborative environments and am always eager to learn new technologies.',
    religion: 'Not specified',
    dob: '1995-08-15'
  },
  experience: [
    {
      id: crypto.randomUUID(),
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      startDate: '2021-01-01',
      endDate: '',
      isCurrent: true,
      description: '- Led the development of a major feature for a client-facing product, resulting in a 20% increase in user engagement.\n- Mentored junior developers and conducted code reviews.\n- Optimized application performance, reducing page load times by 30%.'
    },
     {
      id: crypto.randomUUID(),
      jobTitle: 'Software Engineer',
      company: 'Innovate Co.',
      startDate: '2018-06-01',
      endDate: '2020-12-31',
      isCurrent: false,
      description: '- Developed and maintained full-stack features for a SaaS platform.\n- Collaborated with product managers and designers to translate requirements into technical solutions.\n- Wrote unit and integration tests to ensure code quality.'
    }
  ],
  education: [
    {
      id: crypto.randomUUID(),
      degree: 'M.S. in Computer Science',
      institution: 'Stanford University',
      startDate: '2016-09-01',
      endDate: '2018-05-31',
      description: 'Focused on artificial intelligence and machine learning. Thesis on natural language processing.'
    },
    {
      id: crypto.randomUUID(),
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      startDate: '2012-09-01',
      endDate: '2016-05-31',
      description: 'Graduated with honors. Member of the ACM student chapter.'
    }
  ],
  certificates: [
    {
      id: crypto.randomUUID(),
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      date: '2022-03-10'
    }
  ],
  hobbies: [
    { id: crypto.randomUUID(), name: 'Hiking' },
    { id: crypto.randomUUID(), name: 'Photography' },
    { id: crypto.randomUUID(), name: 'Playing the guitar' }
  ],
  portfolio: []
};

export const emptyCVData: CVData = {
  personal: {
    fullName: '',
    photo: null,
    tagline: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    bio: '',
    religion: '',
    dob: ''
  },
  experience: [],
  education: [],
  certificates: [],
  hobbies: [],
  portfolio: []
};
