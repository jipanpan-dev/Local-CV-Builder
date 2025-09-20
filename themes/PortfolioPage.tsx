import React from 'react';
import { PortfolioItem } from '../types';

interface PortfolioPageProps {
    portfolio: PortfolioItem[];
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ portfolio }) => {
    // Filter out items that don't have an image or project name
    const validPortfolio = portfolio.filter(item => item.image && item.projectName);

    return (
        <div className="p-10 bg-white min-h-full font-sans">
            <h1 className="text-3xl font-bold text-center mb-8 border-b-2 pb-4 text-gray-800">Portfolio</h1>
            <div className="grid grid-cols-2 gap-8">
                {validPortfolio.map(item => (
                    <div key={item.id} className="flex flex-col group">
                        {item.image && 
                            <div className="overflow-hidden rounded-lg shadow-md mb-4">
                                <img 
                                    src={item.image} 
                                    alt={item.projectName} 
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                                />
                            </div>
                        }
                        <h2 className="text-xl font-semibold text-gray-800">{item.projectName}</h2>
                        {item.year && <p className="text-sm text-gray-500 mb-2">{item.year}</p>}
                        {item.description && <p className="text-sm text-gray-700">{item.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioPage;
