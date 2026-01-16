
import React, { useState } from 'react';
import { GSMFile, FileType } from '../types';

interface Props {
  files: GSMFile[];
  brands: string[];
}

const FileBrowser: React.FC<Props> = ({ files, brands }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | 'All'>('All');
  const [search, setSearch] = useState('');

  const filteredFiles = files.filter(f => {
    const matchesBrand = selectedBrand === 'All' || f.brand === selectedBrand;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || 
                          f.model.toLowerCase().includes(search.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const getTypeIcon = (type: FileType) => {
    switch (type) {
      case 'ROM': return 'fa-compact-disc';
      case 'Tool': return 'fa-wrench';
      case 'Utility': return 'fa-toolbox';
      case 'Driver': return 'fa-hard-drive';
      default: return 'fa-file';
    }
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="glass p-4 rounded-2xl flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input 
            type="text"
            placeholder="Search by model, brand, or file name..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="All">All Brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* File List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredFiles.length > 0 ? filteredFiles.map(file => (
          <div key={file.id} className="glass p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
              <i className={`fa-solid ${getTypeIcon(file.type)} text-cyan-400 text-xl`}></i>
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest">{file.type}</span>
                <span className="text-[10px] text-slate-500 font-mono">{file.updatedAt}</span>
              </div>
              <h4 className="text-white font-bold truncate">{file.name}</h4>
              <p className="text-slate-500 text-xs truncate">Model: {file.model} • Size: {file.size}</p>
            </div>

            <a 
              href={file.downloadUrl}
              className="w-10 h-10 bg-cyan-600/10 border border-cyan-600/30 text-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all"
              title="Download File"
            >
              <i className="fa-solid fa-download"></i>
            </a>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center text-slate-500">
            <i className="fa-solid fa-folder-open text-5xl mb-4 opacity-20"></i>
            <p>No files found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileBrowser;
