import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabNames = [
  'Private Limited',
  'Sole Proprietorship',
  'Partnership',
  'LLP',
  'OPC',
];

const privateLimitedFields = [
  { label: 'Name of all the relevant persons holding senior management positions & Directors (including Authorized signatory)/UBO', type: 'text', name: 'names' },
  { label: 'ID Proof – Certified Copy of PAN mandatory of all/ minimum 2 Directors (Only signed no company stamp)', type: 'file', name: 'idProof' },
  { label: 'Certified Copy of Aadhaar Card or any OVD or the equivalent e-document of all/ minimum 2 Directors (Only signed no company stamp)', type: 'file', name: 'aadhaar' },
  { label: 'PAN Card of the firm attested by the signing authority', type: 'file', name: 'firmPan' },
  { label: 'Certified GST Tax certificate (Signed & Stamped)', type: 'file', name: 'gst' },
  { label: 'Signed Board Resolution - Certified True Copy', type: 'file', name: 'boardResolution' },
  { label: 'Certificate of Incorporation (CIN) copy', type: 'file', name: 'cin' },
  { label: 'MOA (attested with first & last pages)', type: 'file', name: 'moa' },
  { label: 'AOA (attested with first & last pages)', type: 'file', name: 'aoa' },
  { label: 'Cancelled Cheque with latest Bank statement 1st page (CIF No.)', type: 'file', name: 'chequeBankStatement' },
  { label: 'MCA Master Data Copy', type: 'file', name: 'mca' },
  { label: 'Photographs with Geo-Coordinates outside and inside of Office Premises.', type: 'file', name: 'photos' },
  { label: 'Website URL', type: 'text', name: 'website' },
  { label: 'Aadhaar Consent Form (Format shared)', type: 'file', name: 'aadhaarConsent' },
  { label: 'Board Resolution for Mode of Operations (Format shared)', type: 'file', name: 'modeOfOps' },
  { label: 'Business Declaration Form (Format shared)', type: 'file', name: 'businessDeclaration' },
  { label: 'Criminal Undertaking (Format shared)', type: 'file', name: 'criminalUndertaking' },
  { label: 'PEP (Politically Exposed Persons) Declaration (Format shared)', type: 'file', name: 'pepDeclaration' },
  { label: 'Service Agreement (Format shared)', type: 'file', name: 'serviceAgreement' },
];

const tabContents = [
  'Private Limited',
  'Content for Sole Proprietorship',
  'Content for Partnership',
  'Content for LLP',
  'Content for OPC',
];

const Merchants = () => {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);
  const [markerStyle, setMarkerStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    if (tabRefs.current[selected]) {
      const el = tabRefs.current[selected];
      setMarkerStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [selected]);

  return (
    <div className="min-h-screen w-full bg-[#e7ecf3] font-mono">
      <div className="flex items-center justify-center w-full pt-32 pb-12 px-2">
        <div className="w-full max-w-5xl min-h-[520px] rounded-3xl bg-white/80 shadow-2xl border border-white/40 flex flex-col overflow-hidden relative" style={{backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)'}}>
          {/* Horizontal Tab Group */}
          <div className="relative w-full flex flex-col items-center justify-center bg-white/60 pt-8 px-4 md:px-8 border-b border-white/30">
            <div className="relative w-full max-w-4xl mx-auto flex gap-2 rounded-2xl bg-white/60 shadow-inner overflow-x-auto">
              {/* Animated Marker */}
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute top-0 h-full z-0 rounded-2xl bg-[#F18A41]/20 shadow-lg"
                style={{
                  left: markerStyle.left,
                  width: markerStyle.width,
                  height: '100%',
                  pointerEvents: 'none',
                  boxShadow: '0 4px 24px 0 rgba(241,138,65,0.10)',
                  border: '1.5px solid #F18A41',
                  background: 'rgba(241,138,65,0.10)'
                }}
              />
              {tabNames.map((name, idx) => (
                <button
                  key={name}
                  ref={el => tabRefs.current[idx] = el}
                  className={`relative z-10 h-12 px-6 flex items-center text-base md:text-lg font-semibold transition-all duration-200 outline-none focus:outline-none focus:ring-0 active:outline-none active:ring-0 border-none focus:border-none bg-transparent
                    ${selected === idx
                      ? 'text-[#F18A41] font-bold'
                      : 'text-[#233831] hover:bg-[#F18A41]/10 hover:text-[#F18A41]'}
                  `}
                  style={{ borderRadius: 12, border: 'none', outline: 'none', background: 'transparent' }}
                  onClick={() => setSelected(idx)}
                  tabIndex={0}
                  type="button"
                  autoComplete="off"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          {/* Content area with animation */}
          <div className="flex-1 flex items-center justify-center p-8 md:p-16 bg-white/60 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full"
              >
                {selected === 0 ? (
                  <form className="max-w-2xl mx-auto space-y-6 bg-white/90 p-8 rounded-2xl shadow-lg border border-white/40">
                    <h2 className="text-2xl font-bold text-[#233831] mb-4 text-center">Private Limited - Document Submission</h2>
                    {privateLimitedFields.map((field, idx) => (
                      <div key={field.name} className="flex flex-col gap-2">
                        <label htmlFor={field.name} className="font-semibold text-[#233831] text-base">
                          {idx + 1}. {field.label}
                        </label>
                        {field.type === 'file' ? (
                          <input
                            type="file"
                            id={field.name}
                            name={field.name}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#F18A41]/90 file:text-white hover:file:bg-[#F18A41] bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F18A41] focus:border-[#F18A41]"
                          />
                        ) : (
                          <input
                            type="text"
                            id={field.name}
                            name={field.name}
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-white/80 focus:ring-2 focus:ring-[#F18A41] focus:border-[#F18A41]"
                          />
                        )}
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="w-full mt-6 bg-[#F18A41] text-white font-bold py-3 rounded-xl shadow hover:bg-[#233831] hover:text-[#F18A41] transition-colors"
                    >
                      Submit Documents
                    </button>
                  </form>
                ) : (
                  <div className="text-3xl md:text-4xl font-bold text-[#233831] tracking-wide text-center drop-shadow-sm mb-6">
                    {tabContents[selected]}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchants;
