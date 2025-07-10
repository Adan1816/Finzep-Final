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

const soleProprietorshipFields = [
  { label: 'Certified Copy of PAN Card of the proprietor(only signed no company stamp)', type: 'file', name: 'proprietorPan' },
  { label: 'Certified Copy of Aadhaar Card of the proprietor(only signed no company stamp)', type: 'file', name: 'proprietorAadhaar' },
  { label: 'Cancelled cheque for Current account on proprietor\'s name', type: 'file', name: 'cancelledCheque' },
  { label: 'GST Certificate (Signed & Stamped)', type: 'file', name: 'gstCertificate' },
  { label: 'Udyam Registration Certificate (URC) – If available', type: 'file', name: 'udyamCertificate' },
  { label: 'Photographs with Geo-Coordinates of outside and inside of Office Premises.', type: 'file', name: 'officePhotos' },
  { label: 'Website URL (if applicable)', type: 'text', name: 'websiteUrl' },
  { label: 'Aadhaar Consent Form(Format shared)', type: 'file', name: 'aadhaarConsentForm' },
  { label: 'Board Resolution for Mode of Operations(Format shared)', type: 'file', name: 'modeOfOperations' },
  { label: 'Business Declaration Form (Format shared)', type: 'file', name: 'businessDeclarationForm' },
  { label: 'Criminal Undertaking (Format shared)', type: 'file', name: 'criminalUndertakingForm' },
  { label: 'PEP (Politically Exposed Persons) Declaration (Format shared)', type: 'file', name: 'pepDeclarationForm' },
  { label: 'Service Agreement (Format shared)', type: 'file', name: 'serviceAgreementForm' },
];

const partnershipFields = [
  { label: 'Authorization Letter naming all partners - Stamped & signed', type: 'file', name: 'authorizationLetter' },
  { label: 'ID Proof– Certified Copy of PAN of all partners(only signed no company stamp)', type: 'file', name: 'partnersPan' },
  { label: 'Certified Copy of Aadhaar Card or any OVD or the equivalent e-document(only signed no company stamp)', type: 'file', name: 'partnersAadhaar' },
  { label: 'PAN Card of the firm attested by the signing authority', type: 'file', name: 'firmPanCard' },
  { label: 'Attested Partnership deed', type: 'file', name: 'partnershipDeed' },
  { label: 'COP (Certificate of Participation)', type: 'file', name: 'copCertificate' },
  { 
    label: 'Any ONE of the following', 
    type: 'conditional', 
    name: 'gstOrRegistration',
    options: [
      'Certified GST Tax certificate (Signed & Stamped)',
      'Letter of registration authorities',
      'Declaration of non-GST in case GST Certificate is Not applicable'
    ]
  },
  { 
    label: 'Any ONE of the following', 
    type: 'conditional', 
    name: 'bankDocument',
    options: [
      'Cancelled Cheque',
      'Authorisation Letter from Bank',
      'Bank Statement holding minimum 3 transactions and not older than 2 months'
    ]
  },
  { label: 'Signed Board Resolution (Minimum 2 Partners/ Company secretaries) - Certified True Copy', type: 'file', name: 'boardResolution' },
  { 
    label: 'Any ONE of the following', 
    type: 'conditional', 
    name: 'registrationCertificate',
    options: [
      'Incorporation Certificate',
      'MCA Copy',
      'IEC Certificate',
      'Udhyam Certificate',
      'Shop Act Licence',
      'Municipal Corporation Registration Certificate',
      'Registration Certificate e.g. SEBI, RBI'
    ]
  },
  { label: 'Photographs with Geo-Coordinates of Outside and Inside of Office Premises.', type: 'file', name: 'officePhotographs' },
  { label: 'Website URL (if applicable)', type: 'text', name: 'websiteUrl' },
];

const llpFields = [
  { label: 'Authorisation Letter naming all partners - Stamped & signed', type: 'file', name: 'llpAuthorizationLetter' },
  { label: 'ID Proof– Certified Copy of PAN of all partners(Only signed no company stamp)', type: 'file', name: 'llpPartnersPan' },
  { label: 'Certified Copy of Aadhaar Card or any OVD or the equivalent e-document(Only signed no company stamp)', type: 'file', name: 'llpPartnersAadhaar' },
  { label: 'PAN Card of the firm attested by the signing authority', type: 'file', name: 'llpFirmPanCard' },
  { label: 'Attested LLP deed', type: 'file', name: 'llpDeed' },
  { label: 'MCA', type: 'file', name: 'mca' },
  { 
    label: 'Any ONE of the following', 
    type: 'conditional', 
    name: 'llpGstOrRegistration',
    options: [
      'Certified GST Tax certificate (Signed & Stamped)',
      'Letter of registration authorities',
      'Declaration of non-GST in case GST Certificate is Not applicable'
    ]
  },
  { 
    label: 'Any ONE of the following', 
    type: 'conditional', 
    name: 'llpBankDocument',
    options: [
      'Cancelled Cheque',
      'Authorisation Letter from Bank',
      'Bank Statement holding minimum 3 transactions and not older than 2 months'
    ]
  },
  { label: 'Signed Board Resolution (Minimum 2 Partners/ Company secretaries) - Certified True Copy', type: 'file', name: 'llpBoardResolution' },
  { 
    label: 'Any ONE of the following (if LLP address is different from CIN/GST)', 
    type: 'conditional', 
    name: 'llpRegistrationCertificate',
    options: [
      'Incorporation Certificate',
      'MCA Copy',
      'IEC Certificate',
      'Udhyam Certificate',
      'Shop Act Licence',
      'Municipal Corporation Registration Certificate',
      'Registration Certificate e.g. SEBI, RBI'
    ]
  },
  { label: 'Photographs with Geo-Coordinates of outside and inside of Office Premises.', type: 'file', name: 'llpOfficePhotographs' },
  { label: 'CIN(Certificate of incorporation)', type: 'file', name: 'cinCertificate' },
  { label: 'Aadhaar Consent Form(Format shared)', type: 'file', name: 'llpAadhaarConsent' },
  { label: 'Board Resolution for Mode of Operations(Format shared)', type: 'file', name: 'llpModeOfOperations' },
  { label: 'Business Declaration Form (Format shared)', type: 'file', name: 'llpBusinessDeclaration' },
  { label: 'Criminal Undertaking (Format shared)', type: 'file', name: 'llpCriminalUndertaking' },
  { label: 'PEP (Politically Exposed Persons) Declaration (Format shared)', type: 'file', name: 'llpPepDeclaration' },
  { label: 'Service Agreement (Format shared)', type: 'file', name: 'llpServiceAgreement' },
];

const opcFields = [
  { label: 'Name of all the relevant persons holding senior management positions & Directors (including Authorized signatory)/UBO', type: 'text', name: 'opcNames' },
  { label: 'ID Proof – Certified Copy of PAN mandatory of all/ minimum 2 Directors(Only signed no company stamp)', type: 'file', name: 'opcDirectorsPan' },
  { label: 'Certified Copy of Aadhaar Card or any OVD or the equivalent e-document of all/ minimum 2 Directors(Only signed no company stamp)', type: 'file', name: 'opcDirectorsAadhaar' },
  { label: 'PAN Card of the firm attested by the signing authority', type: 'file', name: 'opcFirmPan' },
  { label: 'Certified GST Tax certificate (Signed & Stamped)', type: 'file', name: 'opcGstCertificate' },
  { label: 'Signed Board Resolution - Certified True Copy', type: 'file', name: 'opcBoardResolution' },
  { label: 'Certificate of Incorporation (CIN) copy', type: 'file', name: 'opcCinCopy' },
  { label: 'MOA (attested with first & last pages)', type: 'file', name: 'opcMoa' },
  { label: 'AOA (attested with first & last pages)', type: 'file', name: 'opcAoa' },
  { label: 'Cancelled Cheque with latest Bank statement 1st page (CIF No.)', type: 'file', name: 'opcChequeBankStatement' },
  { label: 'MCA Master Data Copy', type: 'file', name: 'opcMcaMasterData' },
  { label: 'Photographs with Geo-Coordinates outside and inside of Office Premises.', type: 'file', name: 'opcOfficePhotos' },
  { label: 'Website URL', type: 'text', name: 'opcWebsite' },
  { label: 'Aadhaar Consent Form(Format shared)', type: 'file', name: 'opcAadhaarConsent' },
  { label: 'Board Resolution for Mode of Operations(Format shared)', type: 'file', name: 'opcModeOfOperations' },
  { label: 'Business Declaration Form (Format shared)', type: 'file', name: 'opcBusinessDeclaration' },
  { label: 'Criminal Undertaking (Format shared)', type: 'file', name: 'opcCriminalUndertaking' },
  { label: 'PEP (Politically Exposed Persons) Declaration (Format shared)', type: 'file', name: 'opcPepDeclaration' },
  { label: 'Service Agreement (Format shared)', type: 'file', name: 'opcServiceAgreement' },
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
          <div className="relative w-full flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/60 pt-6 pb-4 px-4 md:px-8 border-b border-white/40">
            <div className="relative w-full max-w-4xl mx-auto flex justify-evenly rounded-2xl bg-white/80 shadow-lg border border-white/50 overflow-hidden">
              {/* Animated Marker */}
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute top-0 h-full z-0 rounded-xl bg-gradient-to-r from-[#F18A41]/20 to-[#F18A41]/10 shadow-lg"
                style={{
                  left: markerStyle.left,
                  width: markerStyle.width,
                  height: '100%',
                  pointerEvents: 'none',
                  boxShadow: '0 4px 20px 0 rgba(241,138,65,0.15)',
                  border: '1px solid rgba(241,138,65,0.3)',
                  background: 'linear-gradient(90deg, rgba(241,138,65,0.15) 0%, rgba(241,138,65,0.08) 100%)'
                }}
              />
              {tabNames.map((name, idx) => (
                <button
                  key={name}
                  ref={el => tabRefs.current[idx] = el}
                  className={`relative z-10 h-14 px-8 flex items-center justify-center text-sm md:text-base font-medium transition-all duration-300 outline-none focus:outline-none focus:ring-0 active:outline-none active:ring-0 border-none focus:border-none bg-transparent whitespace-nowrap
                    ${selected === idx
                      ? 'text-[#F18A41] font-bold drop-shadow-sm'
                      : 'text-[#233831]/80 hover:text-[#F18A41] hover:bg-[#F18A41]/5'}
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
                ) : selected === 1 ? (
                  <form className="max-w-2xl mx-auto space-y-6 bg-white/90 p-8 rounded-2xl shadow-lg border border-white/40">
                    <h2 className="text-2xl font-bold text-[#233831] mb-4 text-center">Sole Proprietorship - Document Submission</h2>
                    {soleProprietorshipFields.map((field, idx) => (
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
                ) : selected === 2 ? (
                  <form className="max-w-2xl mx-auto space-y-6 bg-white/90 p-8 rounded-2xl shadow-lg border border-white/40">
                    <h2 className="text-2xl font-bold text-[#233831] mb-4 text-center">Partnership - Document Submission</h2>
                    {partnershipFields.map((field, idx) => (
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
                        ) : field.type === 'conditional' ? (
                          <div className="space-y-2">
                            {field.options.map((option, optionIdx) => (
                              <div key={optionIdx} className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  id={`${field.name}_${optionIdx}`}
                                  name={field.name}
                                  value={option}
                                  className="w-4 h-4 text-[#F18A41] bg-gray-100 border-gray-300 focus:ring-[#F18A41] focus:ring-2"
                                />
                                <label htmlFor={`${field.name}_${optionIdx}`} className="text-sm text-[#233831]">
                                  {optionIdx === 0 ? 'a.' : optionIdx === 1 ? 'b.' : optionIdx === 2 ? 'c.' : optionIdx === 3 ? 'd.' : optionIdx === 4 ? 'e.' : optionIdx === 5 ? 'f.' : 'g.'} {option}
                                </label>
                              </div>
                            ))}
                            <input
                              type="file"
                              name={`${field.name}_file`}
                              className="mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#F18A41]/90 file:text-white hover:file:bg-[#F18A41] bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F18A41] focus:border-[#F18A41]"
                            />
                          </div>
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
                ) : selected === 3 ? (
                  <form className="max-w-2xl mx-auto space-y-6 bg-white/90 p-8 rounded-2xl shadow-lg border border-white/40">
                    <h2 className="text-2xl font-bold text-[#233831] mb-4 text-center">LLP - Document Submission</h2>
                    {llpFields.map((field, idx) => (
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
                        ) : field.type === 'conditional' ? (
                          <div className="space-y-2">
                            {field.options.map((option, optionIdx) => (
                              <div key={optionIdx} className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  id={`${field.name}_${optionIdx}`}
                                  name={field.name}
                                  value={option}
                                  className="w-4 h-4 text-[#F18A41] bg-gray-100 border-gray-300 focus:ring-[#F18A41] focus:ring-2"
                                />
                                <label htmlFor={`${field.name}_${optionIdx}`} className="text-sm text-[#233831]">
                                  {optionIdx === 0 ? 'a.' : optionIdx === 1 ? 'b.' : optionIdx === 2 ? 'c.' : optionIdx === 3 ? 'd.' : optionIdx === 4 ? 'e.' : optionIdx === 5 ? 'f.' : 'g.'} {option}
                                </label>
                              </div>
                            ))}
                            <input
                              type="file"
                              name={`${field.name}_file`}
                              className="mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#F18A41]/90 file:text-white hover:file:bg-[#F18A41] bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F18A41] focus:border-[#F18A41]"
                            />
                          </div>
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
                ) : selected === 4 ? (
                  <form className="max-w-2xl mx-auto space-y-6 bg-white/90 p-8 rounded-2xl shadow-lg border border-white/40">
                    <h2 className="text-2xl font-bold text-[#233831] mb-4 text-center">OPC - Document Submission</h2>
                    {opcFields.map((field, idx) => (
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
